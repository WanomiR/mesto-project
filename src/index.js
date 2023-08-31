// ---------- Imports ------------ //

import {enableValidation} from "./components/validate.js";
import {loadInitialCards} from "./components/cards.js";
import {openPopup, closePopup, submitFormCard, submitFormProfile} from "./components/modal.js"

// ---------- Variables ---------- //

// selectors for enabling validation
const validationSelectorsSet = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active"
}

// popup elements
const popupElementsList = Array.from(document.querySelectorAll(".popup"))
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
// form elements
const formElementProfile = document.querySelector(".form_type_profile");
const formElementCard = document.querySelector(".form_type_card");


// ---------- Listeners ---------- //

// open popups functionality
profileEditButton.addEventListener("click", () => {
    openPopup(popupProfile)
});
addCardButton.addEventListener("click", () => {
    openPopup(popupCard);
});

// close popups functionality
popupElementsList.forEach((popupElement) => {
    const closeButton = popupElement.querySelector(".popup__close-button");

    closeButton.addEventListener("click", (evt) => {
        closePopup(popupElement);
    });
    popupElement.addEventListener("click", (evt) => {
        closePopup(evt.target);
    });
    document.addEventListener("keyup", (evt) => {
        if (evt.key === "Escape") {
            closePopup(popupElement);
        }
    });
});

// submit form listeners
formElementCard.addEventListener("submit", submitFormCard);
formElementProfile.addEventListener("submit", submitFormProfile);


// ---------- Functions ---------- //

// load the initial set of cards
loadInitialCards();
// enable forms validation
enableValidation(validationSelectorsSet);
