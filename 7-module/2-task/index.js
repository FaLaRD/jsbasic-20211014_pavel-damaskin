import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._root = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this._closeBtn = this._root.querySelector('.modal__close');
  }

  open() {
    const body = document.body;

    body.classList.add('is-modal-open');
    body.append(this._root);

    this._attachEvents();
  }

  close() {
    const body = document.body;

    body.classList.remove('is-modal-open');
    this._root.remove();

    this._detachEvents();
  }

  setTitle(title) {
    this._root.querySelector('.modal__title').innerHTML = title;
  }

  _handleEscButton = function(e) {
    if (!(e.code === 'Escape')) {
      return;
    }

    this.close();
  }.bind(this);

  setBody(node) {
    this._root.querySelector('.modal__body').innerHTML = '';
    this._root.querySelector('.modal__body').append(node);
  }

  _attachEvents() {
    document.addEventListener('keydown', this._handleEscButton);

    this._closeBtn.addEventListener('click', () => {
      this.close();
    });
  }

  _detachEvents() {
    document.removeEventListener('keydown', this._handleEscButton);
  }
}
