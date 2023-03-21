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
      popupInputsValues[input.id] = input.value;
    });
    return popupInputsValues;
  }

  close() {
    super.close()
    document.removeEventListener('keydown', this._handleEscClose);

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners()

    this._form.addEventListener('input', ()=>{
      console.log(this._getInputValues())
    })

    this._popup.addEventListener('submit', this._submitFunction);
  }
}