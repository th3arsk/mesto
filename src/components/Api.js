export default class Api {
  constructor({baseUrl, authorization}) {
    this._cardsUrl = baseUrl + '/cards';
    this._userInfoUrl = baseUrl + '/users/me';
    this._userAvatarUrl = baseUrl + '/users/me/avatar';

    this._autorization = authorization;
  }

  _getHeader() {
    return {
      'Content-Type': 'application/json',
      authorization: this._autorization
      
    }
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(this._cardsUrl , {
      method: 'GET',
      headers: this._getHeader()
    })
    .then(this._getJson);
  }

  getUserInfo() {
    return fetch(this._userInfoUrl, {
      method: 'GET',
      headers: this._getHeader()
    })
    .then(this._getJson);
  }

  postUserInfo({name, about}) {
    return fetch(this._userInfoUrl, {
      method: 'PATCH',
      headers: this._getHeader(),
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
    .then(this._renderLoading());
  }

  postUserAvatar(data) {
    return fetch(this._userAvatarUrl, {
      method: 'PATCH',
      headers: this._getHeader(),
      body: JSON.stringify({
        avatar: data,
      })
    })
    .then(this._renderLoading());
  }

  postCard(data) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._getHeader(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._renderLoading());
  }

  deleteCard(id) {
    return fetch(this._cardsUrl + '/' + id, {
      method: 'DELETE',
      headers: this._getHeader()
    })
  }

  putLike(id) {
    return fetch(this._cardsUrl + '/' + id + '/likes', {
      method: 'PUT',
      headers: this._getHeader()
    })
  }

  removeLike(id) {
    return fetch(this._cardsUrl + '/' + id + '/likes', {
      method: 'DELETE',
      headers: this._getHeader()
    })
  }

  _renderLoading() {
    const popup = document.querySelector('.popup_opened')
    const button = popup.querySelector('.popup__button');
  
    button.textContent = 'Сохранение...';
    setTimeout(() => {
      if ( popup.classList.contains('add-popup')) {
        button.textContent = 'Создать';
      } else {
        button.textContent = 'Сохранить';
      }
    }, 1000);
  }
}