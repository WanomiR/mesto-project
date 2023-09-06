// ---------- Variables ---------- //

const apiConfig = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-28",
    headers: {
        authorization: "ae8892c5-a1e1-40d3-aba9-31eb2dd98185",
        "Content-Type": "application/json"
    }
}


// ---------- Functions ----------//

const getInitialCards = () => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers,
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            Promise.reject(`Error loading cards: ${res.status}`);
        });
}

const getUserInfo = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: "GET",
        headers: apiConfig.headers,
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            Promise.reject(`Error loading user info: ${res.status}`);
        });
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            Promise.reject(`Error patching user info: ${res.status}`);
        });
}


const patchAvatar = (avatarLink) => {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            Promise.reject(`Error patching user avatar: ${res.status}`);
        });
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
        .then(res => {
            if (res.ok) return res.json();
            Promise.reject(`Error posting new card: ${res.status}`);
        });
}




const putLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: apiConfig.headers
    })
        .then(res => {
            if (res.ok) return res.json()
            Promise.reject(`Error putting like: ${res.status}`);
        });
}

const deleteLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: apiConfig.headers
    })
        .then(res => {
            if (res.ok) return res.json()
            Promise.reject(`Error putting like: ${res.status}`);
        });
}

// ---------- Exports ----------- //

export {getInitialCards, getUserInfo, patchUserInfo, patchAvatar, postNewCard, putLike, deleteLike}


