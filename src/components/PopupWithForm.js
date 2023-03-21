import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitFunction}) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitFunction = submitFunction;
  } 

  _getInputValues() {
  this._popupInputsValues = {};
   this._popup.querySelectorAll('.popup__input').forEach(input => {
      this._popupInputsValues[input.id] = input.value;
    });

    return this._popupInputsValues;
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);

    this._popup.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (e) => {
      if ( e.target === e.currentTarget ) {
        this.close();
      }
    });

    this._popup.addEventListener('submit', this._submitFunction);
  }
}