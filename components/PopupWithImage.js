import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._caption = this._popup.querySelector('.picture-popup__caption');
    this._image = this._popup.querySelector('.picture-popup__image');
  } 

  open(text, link) {
    this._popup.classList.add('popup_opened');
    this._caption.textContent = text;
    this._image.alt = text;
    this._image.src = link;
  }
}