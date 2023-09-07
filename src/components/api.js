// ---------- Imports ------------ //

import {getResponseData} from "./utils"


// ---------- Variables ---------- //

const apiConfig = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-28",
    headers: {
        authorization: "ae8892c5-a1e1-40d3-aba9-31eb2dd98185",
        "Content-Type": "application/json"
    }
}


// ---------- Functions ----------//

const requestCardsInfo = () => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers,
    })
        .then(res => getResponseData(res));
}

const requestUserInfo = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: "GET",
        headers: apiConfig.headers,
    })
        .then(res => getResponseData(res));
}

const patchUserInfo = (inputName, inputDescription) => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: inputName,
            about: inputDescription
        })
    })
        .then(res => getResponseData(res));
}


const patchAvatar = (avatarLink) => {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
        .then(res => getResponseData(res));
}


const postNewCard = (placeName, imageLink) => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: placeName,
            link: imageLink
        })
    })
        .then(res => getResponseData(res));
}


const putLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: apiConfig.headers
    })
        .then(res => getResponseData(res));
}

const deleteLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: apiConfig.headers
    })
        .then(res => getResponseData(res));
}

const requestCardDeletion = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: apiConfig.headers
    })
        .then(res => getResponseData(res));
}

// ---------- Exports ----------- //

export {
    requestCardsInfo,
    requestUserInfo,
    patchUserInfo,
    patchAvatar,
    postNewCard,
    putLike,
    deleteLike,
    requestCardDeletion
}


