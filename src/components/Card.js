export default class Card {
  constructor({data, templateSelector, profileId, handleCardClick, handleCardDelete, handleCardLike}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id
    this._cardId = data._id;
    this._data = data;

    this._profileId = profileId;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._apiLike = handleCardLike;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  
    return cardElement;
  }
 
  deleteCard() {
    this._element.remove(); 
    this._element = null;
  }

  _removeIcon() {
    if ( this._ownerId !== this._profileId ) {
      this._buttonDelete.remove();
    }
  }

  putLike() {
    this._like.classList.add('like-button_active');
    
  }

  removeLike() {
    this._like.classList.remove('like-button_active');
    
  }

  isLiked() {
    if (this._likes.some( like => like._id === this._profileId )) {
      return true
    } else {
      return false
    }
  }

  _checkLikeIcon() {
    if ( this.isLiked() ) {
      this.putLike();
    } else {
      this.removeLike();
    }
  }

  updateLikesCount(likes) {
    this._element.querySelector('.element__like-count').textContent = likes.length;
  }

  updateLikesView(likes) {
    this.updateLikesCount(likes);
    this._checkLikeIcon();
  }

  _setEventListeners () {
    this._buttonDelete = this._element.querySelector('.delete-button');
    this._buttonDelete.addEventListener('click', ()=>{
      this._handleCardDelete(this._cardId);
    })

    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._handleCardClick();
    })

    this._like = this._element.querySelector('.like-button');
    this._like.addEventListener('click', () => {
      this._apiLike(this._cardId);
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._removeIcon();
    this.updateLikesView(this._likes);

    this._picture = this._element.querySelector('.element__picture');
    this._picture.src = this._link;
    this._picture.alt = `${ 'Фото ' + this._name + 'а'}`;

    this._element.querySelector('.element__name').textContent = this._name;
    
    return this._element;
  }   
}

