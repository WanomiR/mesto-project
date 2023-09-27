// ---------- Imports ------------ //

import {requestUserInfo} from "./Api";
import {profileAvatar, profileDescription, profileName} from "./modal.js";


// ---------- Variables ---------- //

// selectors for enabling forms validation
const selectorsSet = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active"
}

const ESC_KEY = "Escape";


// ---------- Functions ---------- //

const disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
}

const enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
}

const updateProfile = (userData) => {
    profileName.textContent = userData["name"];
    profileName.dataset.userId = userData["_id"];
    profileDescription.textContent = userData["about"];
    profileAvatar.src = userData["avatar"];
}

const updateLikesCounter = (cardContent, likesCounter) => {
    const nLikes = cardContent["likes"].length;
    if (nLikes > 0) {
        likesCounter.classList.add("card__like-counter_active");
        likesCounter.textContent = nLikes;
    } else {
        likesCounter.classList.remove("card__like-counter_active");
        likesCounter.textContent = "";
    }
}

const hasMyLike = (cardContent, currUserId) => {
    return cardContent["likes"].some(userData => {
        return userData["_id"] === currUserId;
    });
}

const updateLikeButtonState = (likeButton, cardContent, likesCounter, currUserId) => {
    if (hasMyLike(cardContent, currUserId)) {
        likeButton.classList.add("card__like-button_active");
    } else {
        likeButton.classList.remove("card__like-button_active");
    }
    updateLikesCounter(cardContent, likesCounter);
}

const cardOwner = (cardContent, currUserId) => {
    return cardContent["owner"]["_id"] === currUserId
}

const renderLoading = (buttonElement, isLoading) => {
    if (isLoading) {
        buttonElement.textContent = "Сохранение...";
    } else {
        buttonElement.textContent = "Сохранить";
    }
}

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    } else {
        return res.json()
    }
}


// ---------- Exports ----------- //

export {
    selectorsSet,
    ESC_KEY,
    disableButton,
    enableButton,
    updateProfile,
    updateLikesCounter,
    hasMyLike,
    updateLikeButtonState,
    cardOwner,
    renderLoading,
    getResponseData
}