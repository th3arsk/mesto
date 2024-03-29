export default class Popup {
  constructor( popupSelector ){
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') { 
      this.close()
    }   
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    })

    this._popup.addEventListener('click', (e) => {
      if ( e.target === e.currentTarget ) {
        this.close();
      }
    });
  }
}
