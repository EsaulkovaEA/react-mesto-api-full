class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //получение карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  //получение информации о пользователе
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  //отправить отредактированные данные
  editProfile({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  //добавление карточки
  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  // добавление лайка
  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // удаление лайков
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // сменить аватар
  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }
  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
    // .then((res) => {
    //   return res.data;
    // })
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkResponse)
      // .then((data) => {
      //   if (data.token) {
      //     localStorage.setItem("jwt", data.token);
      //     return data;
      //   }
      // })
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: "https://esaulkovaea.nomoredomains.sbs",
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});

const auth = new Api({
  url: "https://esaulkovaea.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, auth };
