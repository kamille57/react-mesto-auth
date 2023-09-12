class Auth {
  constructor() {
    this.baseUrl = "https://auth.nomoreparties.co";
    console.log(this.baseUrl);
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

  register(email, password) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password })
    })
      .then((response) => {
        return response;
      })
      .catch((err) => console.log(err));
  }

  login(email, password) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password })
    });
  }

  checkToken(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
  }
}

export default Auth;