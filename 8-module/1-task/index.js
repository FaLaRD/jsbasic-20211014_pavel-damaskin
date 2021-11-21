import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      if (!this._elemScrolledPosition) {
        this._elemScrolledPosition = this.elem.getBoundingClientRect().top + window.pageYOffset;
      }

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this._isElemHidden(this.elem)) {
      return;
    }

    if (
      window.pageYOffset > this._elemScrolledPosition
      &&
      document.documentElement.clientWidth > 768
    ) {
      this.elem.style.cssText = `
        position: fixed;
        top: ${this._getPositionCoords().top}px;
        left: ${this._getPositionCoords().left}px;
        z-index: 3;
      `;
    } else {
      this.elem.style.cssText = '';
    }
  }

  _getPositionCoords() {
    const container = document.querySelector('.container');
    const containerOffset = container.getBoundingClientRect().left + container.offsetWidth;
    const clientWidth = document.documentElement.clientWidth;
    const elemWidth = this.elem.offsetWidth;

    const iconLeftPositionWide = containerOffset + 20;
    const iconLeftPositionNarrow = clientWidth - elemWidth - 10;

    let left;
    let isIconFitted = (iconLeftPositionWide + elemWidth) < clientWidth;

    left = (isIconFitted) ?
      iconLeftPositionWide :
      iconLeftPositionNarrow;

    return {
      top: 50,
      left: left,
    };
  }

  _isElemHidden(elem) {
    return !elem.offsetWidth && !elem.offsetHeight;
  }
}
