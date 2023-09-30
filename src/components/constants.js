
// Api
const apiConfig = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-28",
    headers: {
        authorization: "ae8892c5-a1e1-40d3-aba9-31eb2dd98185",
        "Content-Type": "application/json"
    }
}

// Form
const formSelectors = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
}

// Card
const cardSelectors = {
    templateSelector: ".card__template",
    cardElement: ".card",
    title: ".card__title",
    image: ".card__image",
    likeButton: ".card__like-button",
    likeButtonActive: "card__like-button_active",
    likesCounter: ".card__like-counter",
    likesCounterActive: "card__like-counter_active",
    deleteButton: ".card__delete-button",
    deleteButtonActive: "card__delete-button_active",
}

const userSelectors = {
    nameSelector: ".profile__title",
    aboutSelector: ".profile__subtitle",
    avatarSelector: ".profile__avatar"
}

const cardsGrid = document.querySelector(".places__grid");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonEditAvatar = document.querySelector(".profile__edit-avatar-button");

const profileForm = document.forms.userInfo
const {userName, userDescription} = profileForm.elements

export {
    apiConfig,
    formSelectors,
    cardSelectors,
    userSelectors,
    cardsGrid,
    buttonAddCard,
    buttonEditProfile,
    buttonEditAvatar,
    profileForm,
    userName,
    userDescription
}