import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let productItem = this.cartItems.find((item) => item.product.id === product.id);

    if (!productItem) {
      productItem = {};
      productItem.product = product;
      productItem.count = 1;
      this.cartItems.push(productItem);
    } else {
      productItem.count++;
    }

    this.onProductUpdate(productItem);
  }

  updateProductCount(productId, amount) {
    const product = this.cartItems.find((item) => item.product.id === productId);

    if (!product) {
      return;
    }

    if (amount > 0) {
      product.count++;
    }

    if (amount < 0) {
      if (product.count === 1) {
        const ix = this.cartItems.findIndex((item) => item.product.id === productId);
        this.cartItems.splice(ix, 1);
      } else {
        product.count--;
      }
    }

    this.onProductUpdate(product);
  }

  isEmpty() {
    return !(!!Object.keys(this.cartItems).length);
  }

  getTotalCount() {
    return this.cartItems.reduce((prev, item) => {
      return prev += item.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((prev, item) => {
      const price = item.product.price;
      const amount = item.count;

      return prev += price * amount;
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this._modal = new Modal();
    this._modal.setTitle('Your order');

    const cartProducts = createElement(`<div></div>`);

    this.cartItems.forEach((item) => {
      cartProducts.append(this.renderProduct(item.product, item.count));
    });

    cartProducts.append(this.renderOrderForm());

    this._modal.setBody(cartProducts);

    this._modal.open();

    cartProducts.addEventListener('click', (e) => {
      const counterButton = e.target.closest('.cart-counter__button');

      if (!counterButton) {
        return;
      }

      const product = counterButton.closest('.cart-product');
      const id = product.dataset.productId;

      let amount;

      if (counterButton.classList.contains('cart-counter__button_minus')) {
        amount = -1;
      }

      if (counterButton.classList.contains('cart-counter__button_plus')) {
        amount = 1;
      }

      this.updateProductCount(id, amount);

      if (!(this.cartItems.some((item) => item.product.id === id))) {
        product.remove();
      }

      if (this.getTotalCount() === 0) {
        this._modal.close();
      }
    });

    const modalForm = cartProducts.querySelector('.cart-form');
    modalForm.addEventListener('submit', this.onSubmit);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    const id = cartItem.product.id;
    const product = document.querySelector(`.cart-product[data-product-id=${id}]`);

    const productCount = product.querySelector('.cart-counter__count');
    const productPrice = product.querySelector('.cart-product__price');
    const productTotalPrice = document.querySelector('.cart-buttons__info-price');

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    productTotalPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const btn = form.querySelector('[type="submit"]');
    btn.classList.add('is-loading');

    const URL = 'https://httpbin.org/post';
    const data = new FormData(form);

    fetch(URL, {
      method: 'POST',
      body: data
    })
      .then((response) => {
        if (response.ok) {
          this.cartItems.length = 0;
          this.cartIcon.update(this);

          this._modal.setTitle('Success!');
          this._modal.setBody(createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif" alt="">
              </p>
            </div>
          `));
        }
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

