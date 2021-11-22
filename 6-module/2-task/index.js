import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this._root = this.createNode(product);
    this.add2cart(product.id);
  }

  get elem() {
    return this._root;
  }

  createNode({ name, price, image }) {
    return createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${image}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
             <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
  }

  add2cart(id) {
    this._root.addEventListener('click', ({ target}) => {
      const add2cartBtn = target.closest('.card__button');

      if (!add2cartBtn) {
        return;
      }

      const evt = new CustomEvent('product-add', {
        detail: id,
        bubbles: true,
      });

      this._root.dispatchEvent(evt);
    });
  }
}
