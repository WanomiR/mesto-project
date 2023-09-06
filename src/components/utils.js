// ---------- Variables ---------- //

// selectors for enabling forms validation
import {deleteLike, getUserInfo, putLike} from "./api";
import {profileAvatar, profileDescription, profileName} from "./modal.js";

const selectorsSet = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active"
}

// object for storing user data

// ---------- Functions ---------- //

const disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
}

const enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
}


const updateProfile = () => {
    getUserInfo()
        .then(res => {
            profileName.textContent = res.name;
            profileName.dataset.userId = res._id;
            profileDescription.textContent = res.about;
            profileAvatar.src = res.avatar;

        })
        .catch(err => console.log(err));
}

const updateLikesCounter = (cardContent, likesCounter) => {
    const nLikes = cardContent.likes.length;
    if (nLikes > 0) {
        likesCounter.classList.add("card__like-counter_active");
        likesCounter.textContent = nLikes;
    } else {
        likesCounter.classList.remove("card__like-counter_active");
        likesCounter.textContent = "";
    }
}

const hasMyLike = (cardContent, currUserId) => {
    return cardContent.likes.some(userData => {
        return userData._id === currUserId
    })
}

const updateLikeButtonState = (likeButton, cardContent, likesCounter, currUserId) => {
    if (hasMyLike(cardContent, currUserId)) {
        likeButton.classList.add("card__like-button_active");
    } else {
        likeButton.classList.remove("card__like-button_active");
    }
    updateLikesCounter(cardContent, likesCounter)
}

const createdByMe = (cardContent, currUserId) => {
    return cardContent.owner._id === currUserId
}

// ---------- Exports ----------- //

export {
    selectorsSet,
    disableButton,
    enableButton,
    updateProfile,
    updateLikesCounter,
    hasMyLike,
    updateLikeButtonState,
    createdByMe
}