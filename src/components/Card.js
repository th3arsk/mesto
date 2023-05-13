export default class Card {
  constructor({data, templateSelector, profileId, handleCardClick, handleCardDelete, handleCardLike, handleCardRemoveLike}) {
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
    this._apiRemoveLike = handleCardRemoveLike;
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

  _putLike() {
    this._like.classList.add('like-button_active');
    this._apiLike(this._cardId);
  }

  _removeLike() {
    this._like.classList.remove('like-button_active');
    this._apiRemoveLike(this._cardId);
  }

  getLikeCount(res) {
    this._element.querySelector('.element__like-count').textContent = res.length;
  }

  _isLiked() {
    if (this._likes.some( like => like._id === this._profileId )) {
      return true
    } else {
      return false
    }
  }

  _checkLikeIcon() {
    if ( this._isLiked() ) {
      this._like.classList.add('like-button_active');
    } else {
      this._like.classList.remove('like-button_active');
    }
  }

  _handleLLike() {
    if ( this._isLiked() ) {
      this._removeLike();
    } else {
      this._putLike();
    }
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
      this._handleLLike();
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._removeIcon();
    this.getLikeCount(this._likes);
    this._checkLikeIcon();

    this._picture = this._element.querySelector('.element__picture');
    this._picture.src = this._link;
    this._picture.alt = `${ 'Фото ' + this._name + 'а'}`;

    this._element.querySelector('.element__name').textContent = this._name;
    
    return this._element;
  }   
}

