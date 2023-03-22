import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitFunction}) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  } 

  _getInputValues() {
    const popupInputsValues = {};
    this._inputList.forEach(input => {
      popupInputsValues[input.name] = input.value;
    });
    return popupInputsValues 
  }

  close() {
    super.close()

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners()

    this._popup.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }
}