import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {}

  async render() {
    /* carousel start */
    this._initCarousel();
    /* carousel end */

    /* ribbon start */
    this._initRibbonMenu();
    /* ribbon end */

    /* slider start */
    this._initSliderRange();
    /* slider end */

    /* cart-icon start */
    this._initCartIcon();
    /* cart-icon end */

    /* cart start */
    this._cartInstance = new Cart(this._cartIconInstance);
    /* cart end */

    /* fetch products start */
    const response = await fetch('./products.json', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    this._products = await response.json();
    /* fetch products end */

    /* products grid start */
    this._initProductsGrid();
    /* products grid end */

    /* events start */
    this._handleEvents();
    /* events end */
  }

  _initCarousel() {
    this._carouselInstance = new Carousel(slides);
    const carouselContainer = document.querySelector('[data-carousel-holder]');
    carouselContainer.append(this._carouselInstance.elem);
  }

  _initRibbonMenu() {
    this._ribbonMenuInstance = new RibbonMenu(categories);
    const ribbonContainer = document.querySelector('[data-ribbon-holder]');
    ribbonContainer.append(this._ribbonMenuInstance.elem);
  }

  _initSliderRange() {
    this._stepSliderInstance = new StepSlider({ steps: 5, value: 3});
    const sliderContainer = document.querySelector('[data-slider-holder]');
    sliderContainer.append(this._stepSliderInstance.elem);
  }

  _initCartIcon() {
    this._cartIconInstance = new CartIcon();
    const cartIconContainer = document.querySelector('[data-cart-icon-holder]');
    cartIconContainer.append(this._cartIconInstance.elem);
  }

  _initProductsGrid() {
    this._productGridInstance = new ProductsGrid(this._products);
    const productGridContainer = document.querySelector('[data-products-grid-holder]');
    productGridContainer.innerHTML = '';
    productGridContainer.append(this._productGridInstance.elem);

    this._filter = {
      noNuts: document.getElementById('nuts-checkbox').checked || false,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked || false,
      maxSpiciness: this._stepSliderInstance.value,
      category: this._ribbonMenuInstance.value,
    };

    this._productGridInstance.updateFilter(this._filter);
  }

  _handleEvents() {
    const body = document.body;

    body.addEventListener('product-add', (e) => {
      const id = e.detail;
      const product = this._products.find((product) => product.id === id);
      this._cartInstance.addProduct(product);
    });

    this._stepSliderInstance.elem.addEventListener('slider-change', (e) => {
      const maxSpiciness = e.detail;
      this._productGridInstance.updateFilter({ maxSpiciness });
    });

    this._ribbonMenuInstance.elem.addEventListener('ribbon-select', (e) => {
      const category = e.detail;
      this._productGridInstance.updateFilter({ category });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', ({ currentTarget}) => {
      this._productGridInstance.updateFilter({ noNuts: currentTarget.checked });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', ({ currentTarget }) => {
      this._productGridInstance.updateFilter({ vegeterianOnly: currentTarget.checked });
    });
  }
}
