class Api {
  constructor() {
    this.baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-71';
    this.headers = {
      authorization: '84f0b731-4685-4b31-9185-d609841667ca',
      'Content-Type': 'application/json'
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    });
  }

  setUserInfo(data) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  updateAvatar(avatar) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      headers: this.headers
    });
  }

  addCard(data) {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  likeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  changeLikeCardStatus(cardId, like) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this.headers
    });
  }
}

export default Api;