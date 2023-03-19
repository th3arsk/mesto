export default class Card {
  constructor({data, templateSelector, handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  
    return cardElement;
  }
 
  _deleteCard() {
    this._element.remove(); 
  }

  _setDeleteButton() {
    const buttonDelete = this._element.querySelector('.delete-button');
    buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _toggleLike(like) {
    like.classList.toggle('like-button_active');
  }

  _toggleLikeButton() {
    const like = this._element.querySelector('.like-button');
    like.addEventListener('click', () => {
      this._toggleLike(like);
    });
  } 

  _setPictureListener(){
    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._handleCardClick()
    })
  }

  _setEventListeners () {
    this._setDeleteButton();
    this._toggleLikeButton();
    this._setPictureListener();
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

