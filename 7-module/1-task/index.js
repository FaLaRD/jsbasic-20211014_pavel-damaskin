import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._init();
  }

  get elem() {
    return this._root;
  }

  _init() {
    this._currentOffset = 350;
    this._root = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
    this._ribbon = this._root.querySelector('.ribbon__inner');

    this._prev = this._root.querySelector('.ribbon__arrow_left');
    this._next = this._root.querySelector('.ribbon__arrow_right');

    this._renderItems();
    this._handleEvents();
  }

  _renderItems() {
    if (!Array.isArray(this.categories)) {
      return;
    }

    this.categories.forEach((item, ix) => {
      this._ribbon.append(createElement(`
        <a href="#" class="ribbon__item ${(ix === 0) ? 'ribbon__item_active' : ''}" data-id="${item.id}">${item.name}</a>
      `));
    });
  }

  _moveRibbonPrev() {
    this._ribbon.scrollBy(-this._currentOffset, 0);
  }

  _moveRibbonNext() {
    this._ribbon.scrollBy(this._currentOffset, 0);
  }

  _checkControlsVisibility() {
    (this._ribbon.scrollLeft > 0) ?
      this._prev.classList.add('ribbon__arrow_visible') :
      this._prev.classList.remove('ribbon__arrow_visible');

    ((this._ribbon.scrollLeft + this._ribbon.clientWidth) >= this._ribbon.scrollWidth) ?
      this._next.classList.remove('ribbon__arrow_visible') :
      this._next.classList.add('ribbon__arrow_visible');
  }

  _handleEvents() {
    this._prev.addEventListener('click', this._moveRibbonPrev.bind(this));
    this._next.addEventListener('click', this._moveRibbonNext.bind(this));

    this._ribbon.addEventListener('scroll', this._checkControlsVisibility.bind(this));

    this._ribbon.addEventListener('click', (e) => {
      const item = e.target.closest('.ribbon__item');

      e.preventDefault();

      if (!item) {
        return;
      }

      this._ribbon.querySelectorAll('.ribbon__item').forEach(item => {
        item.classList.remove('ribbon__item_active');
      });

      item.classList.add('ribbon__item_active');

      const id = item.dataset.id;

      const evt = new CustomEvent('ribbon-select', {
        detail: id,
        bubbles: true,
      });

      this._root.dispatchEvent(evt);
    });
  }
}
