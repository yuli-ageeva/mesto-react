class Api {
  constructor({baseUrl, headers}) {
    // тело конструктора
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  setNewInfo(data) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      })
    })
      .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(this.baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  setNewAvatar(data) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(this._checkResponse)
  }

  _setLike(id) {
    return fetch(this.baseUrl + '/cards/' + id + '/likes', {
      method: 'PUT',
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  _deleteLike(id) {
    return fetch(this.baseUrl + '/cards/' + id + '/likes', {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  toggleLike(id, isLiked) {
    if (isLiked) {
      return this._deleteLike(id)
    } else {
      return this._setLike(id)
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '40628a77-ac74-4254-98ee-88b5912799a6',
    'Content-Type': 'application/json'
  }
});

export default api
