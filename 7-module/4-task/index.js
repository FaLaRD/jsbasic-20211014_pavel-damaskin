import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    if (value > steps - 1) {
      throw new Error('Value cannot be more that steps');
    }

    this._value = value;
    this._steps = steps;

    this._root = createElement(`
      <div class="slider">

        <div class="slider__thumb" style="left: 0;">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress" style="width: 0;"></div>

        <div class="slider__steps"></div>
      </div>
    `);

    this._init();
  }

  _init() {
    this._thumb = this._root.querySelector('.slider__thumb');
    this._sliderProgress = this._root.querySelector('.slider__progress');
    this._stepsContainer = this._root.querySelector('.slider__steps');

    this._renderSteps();
    this._setThumbPosition();

    this._root.addEventListener('click', this._handleClick);
    this._thumb.addEventListener('pointerdown', this._handlePointerDown);
  }

  _renderSteps() {
    this._scaleRange = [];

    for (let i = 0; i < this._steps; i++) {
      this._stepsContainer.append(createElement(`
        <span></span>
      `));

      this._scaleRange.push(100 / (this._steps - 1) * i);
    }
  }

  _getClickedPercentPosition(clientX) {
    const clickedXPosition = clientX - this._root.getBoundingClientRect().left;
    let clickedXPositionByPercent = Math.round(clickedXPosition / (this._root.offsetWidth / 100));

    if (clickedXPositionByPercent < 1) {
      clickedXPositionByPercent = 1;
    }

    if (clickedXPositionByPercent > 100) {
      clickedXPositionByPercent = 100;
    }

    return clickedXPositionByPercent;
  }

  _setThumbPosition() {
    this._position = 100 / (this._steps - 1) * this._value;

    this._thumb.querySelector('.slider__value').textContent = `${this._value}`;

    this._stepsContainer.querySelectorAll('span').forEach((item) => {
      item.classList.remove('slider__step-active');
    });

    this._stepsContainer.children[this._value].classList.add('slider__step-active');
  }

  _placeThumb() {
    this._sliderProgress.style.width = `${this._position}%`;
    this._thumb.style.left = `${this._position}%`;
  }

  _getClosestValue(value) {
    let resValue;

    let minIndex;
    let maxIndex;

    for (let i = 0; i < this._scaleRange.length; i++) {
      const item = this._scaleRange[i];

      if (value <= item) {
        maxIndex = i;
        minIndex = maxIndex - 1;
        break;
      }
    }

    resValue = (
      (Math.abs(this._scaleRange[minIndex] - value))
      >
      (Math.abs(this._scaleRange[maxIndex] - value))
    ) ?
      maxIndex :
      minIndex;

    return resValue;
  }

  _handleClick = ({ clientX, target }) => {
    if (target === this._thumb) {
      return;
    }

    const clickedXPositionByPercent = this._getClickedPercentPosition(clientX);

    this._value = this._getClosestValue(clickedXPositionByPercent);

    this._setThumbPosition();
    this._placeThumb();
    this._dispatchCustomEvent();
  }

  _handlePointerDown = () => {
    this._root.classList.add('slider_dragging');

    document.addEventListener('pointermove', this._handlePointerMove);
    document.addEventListener('pointerup', this._handlePointerUp);
  }

  _handlePointerMove = ({ clientX }) => {
    const clickedXPositionByPercent = this._getClickedPercentPosition(clientX);

    this._value = this._getClosestValue(clickedXPositionByPercent);

    this._setThumbPosition();

    this._sliderProgress.style.width = `${clickedXPositionByPercent}%`;
    this._thumb.style.left = `${clickedXPositionByPercent}%`;
  }

  _handlePointerUp = () => {
    this._root.classList.remove('slider_dragging');

    document.removeEventListener('pointermove', this._handlePointerMove);
    document.removeEventListener('pointerup', this._handlePointerUp);

    this._placeThumb();
    this._dispatchCustomEvent();
  }

  _dispatchCustomEvent() {
    const evt = new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true,
    });

    this._root.dispatchEvent(evt);
  }

  get elem() {
    return this._root;
  }
}
