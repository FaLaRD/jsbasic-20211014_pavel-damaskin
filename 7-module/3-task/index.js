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
    this._renderSteps();
    this._setThumbPosition();

    this._root.addEventListener('click', this._handleClick);
  }

  _renderSteps() {
    this._stepsContainer = this._root.querySelector('.slider__steps');
    this._scale = [];

    for (let i = 0; i < this._steps; i++) {
      this._stepsContainer.append(createElement(`
        <span></span>
      `));

      this._scale.push(100 / (this._steps - 1) * i);
    }
  }

  _setThumbPosition() {
    this._position = 100 / (this._steps - 1) * this._value;

    const sliderThumb = this._root.querySelector('.slider__thumb');
    const sliderThumbValue = this._root.querySelector('.slider__value');
    const sliderProgress = this._root.querySelector('.slider__progress');

    sliderThumb.style.left = `${this._position}%`;
    sliderThumbValue.textContent = `${this._value}`;
    sliderProgress.style.width = `${this._position}%`;

    this._stepsContainer.querySelectorAll('span').forEach((item) => {
      item.classList.remove('slider__step-active');
    });

    this._stepsContainer.children[this._value].classList.add('slider__step-active');
  }

  _getClosestValue(value) {
    let resValue = 0;

    if (value < 1) {
      value = 1;
    }

    if (value > 100) {
      value = 100;
    }

    let maxIndex,
        minIndex;

    for (let i = 0; i < this._scale.length; i++) {
      const item = this._scale[i];

      if (value <= item) {
        maxIndex = i;
        minIndex = maxIndex - 1;
        break;
      }
    }

    (
      (Math.abs(this._scale[minIndex] - value))
      >
      (Math.abs(this._scale[maxIndex] - value))
    ) ?
      resValue = maxIndex :
      resValue = minIndex;

    return resValue;
  }

  _handleClick = ({clientX, currentTarget}) => {
    const clickedXPosition = clientX - currentTarget.getBoundingClientRect().left;
    const clickedXPositionByPercent = Math.round(clickedXPosition / (this._root.offsetWidth / 100));

    this._value = this._getClosestValue(clickedXPositionByPercent);
    this._setThumbPosition();

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
