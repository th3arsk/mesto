export default class Card {
  constructor({data, templateSelector, profileId, handleCardClick, openDeletePopup, closeDeletePopup, handleCardDelete, confimDelete,
  putLike, removeLike}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id
    this._cardId = data._id;

    this._profileId = profileId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    
    this._ApiPutLike = putLike;
    this._ApiRemoveLike = removeLike;
    
    this._confimDelete = confimDelete;
    this._openDeletePopup = openDeletePopup;
    this._closeDeletePopup = closeDeletePopup;
    this._handleCardDelete = handleCardDelete;
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

  _putLike(like) {
    like.classList.add('like-button_active');
    this._ApiPutLike(this._cardId);
    this._element.querySelector('.element__like-count').textContent = (this._likes.length + 1);
  }

  _removeLike(like) {
    like.classList.remove('like-button_active');
    this._ApiRemoveLike(this._cardId);
    this._element.querySelector('.element__like-count').textContent = this._likes.length - 1;
  }

  _setLikesCount(like) {
    if (this._isLiked()) {

      this._removeLike(like);
    } else {
      this._putLike(like);
    }
  }

  _isLiked() {
    const profileLike = this._likes.some(like => like._id = this._profileId);
    return profileLike;
  }

  _removeIcon() {
    if ( this._ownerId !== this._profileId ) {
      this._buttonDelete.remove();
    }
  }

  _checkLikeIcon(like) {
    if (this._isLiked) {
      like.classList.add('like-button_active');
    }
  }

  _setEventListeners () {
    this._buttonDelete = this._element.querySelector('.delete-button');
    this._openDeletePopup(this._buttonDelete);
    
    this._confimDelete.addEventListener('click', () => {
      this._deleteCard();
      this._handleCardDelete(this._cardId);
      this._closeDeletePopup();
    })

    this._like = this._element.querySelector('.like-button');
    this._like.addEventListener('click', () => {
      
      this._setLikesCount(this._like);
      
    });

    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._removeIcon();

    this._picture = this._element.querySelector('.element__picture');
    this._picture.src = this._link;
    this._picture.alt = `${ 'Фото ' + this._name + 'а'}`;

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__like-count').textContent = this._likes.length;
  
    return this._element;
  }   
}

