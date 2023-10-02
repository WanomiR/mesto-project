import {apiConf} from "./config";
import {checkResponse} from "./utils";


export const getPersonalInfo = () => {
    return fetch(`${apiConf.url}/${apiConf.groupId}/users/me`, {
        method: "GET",
        headers: {
            authorization: apiConf.token,
            "Content-Type": "application/json"
        }
    }).then(checkResponse);
};

export const getCards = () => {
    return fetch(`${apiConf.url}/${apiConf.groupId}/cards`, {
        method: "GET",
        headers: {
            authorization: apiConf.token,
            "Content-Type": "application/json"
        }
    }).then(checkResponse);
};

export const updatePersonalInfo = (name, about) => {
    return fetch(`${apiConf.url}/${apiConf.groupId}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: apiConf.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(checkResponse);
};

export const postNewCard = (name, link) => {
    return fetch(`${apiConf.url}/${apiConf.groupId}/cards`, {
        method: "POST",
        headers: {
            authorization: apiConf.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(checkResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: apiConf.token,
      "Content-Type": "application/json"
    }
  }).then(checkResponse);
};

export const putLikeOnCard = (cardId) => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/cards//likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: apiConf.token,
      "Content-Type": "application/json"
    }
  }).then(checkResponse);
};

export const deleteLikeOnCard = (cardId) => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/cards//likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: apiConf.token,
      "Content-Type": "application/json"
    }
  }).then(checkResponse);
};

export const updateAvatar = (url) => {
  return fetch(`${apiConf.url}/${apiConf.groupId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: apiConf.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      avatar: url
    })
  }).then(checkResponse);
};
