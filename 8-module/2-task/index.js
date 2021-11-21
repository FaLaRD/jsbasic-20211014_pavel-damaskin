import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this._filteredProducts = this.products;
    this._init();
  }

  _init() {
    this._root = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this._productsContainer = this._root.querySelector('.products-grid__inner');

    this._renderProducts();
  }

  _renderProducts() {
    this._filteredProducts.forEach((product) => {
      const productCard = new ProductCard(product);
      this._productsContainer.append(productCard.elem);
    });
  }

  updateFilter(filter) {
    if (!(typeof filter === 'object' && filter && !Array.isArray(filter))) {
      return;
    }

    this._productsContainer.innerHTML = '';

    this.filters = Object.assign(this.filters, filter);

    this._filteredProducts = this.products.filter((product) => {
      return this._filterProduct(product);
    });

    this._renderProducts();
  }

  _filterProduct(product) {
    if (this.filters['category']) {
      if (product['category'] !== this.filters['category']) {
        return false;
      }
    }

    if (isFinite(this.filters['maxSpiciness'])) {
      if (product['spiciness'] > this.filters['maxSpiciness']) {
        return false;
      }
    }

    if (this.filters['vegeterianOnly']) {
      if (!product['vegeterian']) {
        return false;
      }
    }

    if (this.filters['noNuts']) {
      if (product['nuts']) {
        return false;
      }
    }

    return true;
  }

  get elem() {
    return this._root;
  }
}
