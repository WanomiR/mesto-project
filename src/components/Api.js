export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        } else {
            return res.json();
        }
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then(res => this._handleResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
            .then(res => this._handleResponse(res));
    }

    patchUserInfo({userName, userDescription}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({name: userName, about: userDescription})
        })
            .then(res => this._handleResponse(res));
    }

    patchUserAvatar(imageLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({avatar: imageLink}),
        })
            .then(res => this._handleResponse(res));
    }

    postCard({placeName, imageLink}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name: placeName, link: imageLink}),
        })
            .then(res => this._handleResponse(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res => this._handleResponse(res));
    }

    putLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(res => this._handleResponse(res));
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(res => this._handleResponse(res));
    }
}