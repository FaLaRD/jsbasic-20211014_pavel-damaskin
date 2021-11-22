export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

