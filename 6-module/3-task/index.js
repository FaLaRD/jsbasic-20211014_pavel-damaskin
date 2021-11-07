import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._init();
  }

  get elem() {
    return this._root;
  }

  _init() {
    this._root = createElement(`
      <div class="carousel">

        <div class="carousel__arrow carousel__arrow_left" style="display: none;">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner"></div>

      </div>
    `);

    this._carousel = this._root.querySelector('.carousel__inner');

    this._renderSlides();

    this._prev = this._root.querySelector('.carousel__arrow_left');
    this._next = this._root.querySelector('.carousel__arrow_right');

    this._currentOffset = 0;

    this._prev.addEventListener('click', () => {
      this._slideWidth = this._carousel.querySelector('.carousel__slide').offsetWidth;
      this._currentOffset += this._slideWidth;
      this._moveCarousel();
    });

    this._next.addEventListener('click', () => {
      this._slideWidth = this._carousel.querySelector('.carousel__slide').offsetWidth;
      this._currentOffset -= this._slideWidth;
      this._moveCarousel();
    });

    this._add2cart();
  }

  _renderSlides() {
    const slides = this.slides;

    if (!Array.isArray(slides)) {
      return;
    }

    slides.forEach(slide => {
      this._carousel.append(createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="${slide.name}">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        `)
      );
    });
  }

  _moveCarousel() {
    this._totalSlides = this._carousel.querySelectorAll('.carousel__slide').length;
    this._totalWidth = this._slideWidth * this._totalSlides;

    this._carousel.style.transform = `translateX(${this._currentOffset}px)`;

    if (this._currentOffset) {
      this._prev.style.display = '';
    } else {
      this._prev.style.display = 'none';
    }

    if (Math.abs(this._currentOffset) >= (this._totalWidth - this._slideWidth)) {
      this._next.style.display = 'none';
    } else {
      this._next.style.display = '';
    }
  }

  _add2cart() {
    this._root.addEventListener('click', ({ target }) => {
      const button = target.closest('.carousel__button');

      if (!button) {
        return;
      }

      const id = button.closest('[data-id]').dataset.id;

      const evt = new CustomEvent('product-add', {
        detail: id,
        bubbles: true,
      });

      this._root.dispatchEvent(evt);
    });
  }
}
