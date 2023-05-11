import Popup from "./Popup.js";

export default class PopupOfDelete extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__button');
  } 
}