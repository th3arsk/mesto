import { openPopup, picturePopup, caption, image} from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  
    return cardElement;
  }
 
  _setDeleteButton() {
    const buttonDelete = this._element.querySelector('.delete-button');
    buttonDelete.addEventListener('click', () => {
      this._element.remove(this._element);
    });
  }

  _toggleLikeButton() {
    const like = this._element.querySelector('.like-button');
    like.addEventListener('click', function() {
      like.classList.toggle('like-button_active');
    });
  } 

  _setPictureListener (element) {
    element.querySelector('.element__picture').addEventListener('click', function() {
 
      openPopup(picturePopup);
      caption.textContent = element.querySelector('.element__name').textContent;
      image.src = element.querySelector('.element__picture').src
      image.alt = element.querySelector('.element__picture').alt
    })
  }

  _setEventListeners () {
    this._setDeleteButton();
    this._toggleLikeButton();
    this._setPictureListener(this._element);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
      
    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__picture').alt = `${ 'Фото ' + this._name + 'а'}`;
    this._element.querySelector('.element__name').textContent = this._name;
    
    return this._element;
  }   
}

