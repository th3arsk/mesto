import Popup from "./Popup.js";

export default class PopupOfDelete extends Popup {
  constructor({popupSelector, apiDelete}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.delete-popup__container');
    this._apiDelete = apiDelete;
  } 

  _confimDelete() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._method();
    })
  }

  setSubmitHandler(method) {
    this._method = method;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confimDelete();
  }
}