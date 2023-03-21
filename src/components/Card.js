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
    this._element = null;
  }

  _toggleLike(like) {
    like.classList.toggle('like-button_active');
  }

  _setEventListeners () {
    this._buttonDelete = this._element.querySelector('.delete-button');
    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });

    this._like = this._element.querySelector('.like-button');
    this._like.addEventListener('click', () => {
      this._toggleLike(this._like);
    });

    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._picture = this._element.querySelector('.element__picture');
    this._picture.src = this._link;
    this._picture.alt = `${ 'Фото ' + this._name + 'а'}`;

    this._element.querySelector('.element__name').textContent = this._name;
    
    return this._element;
  }   
}

