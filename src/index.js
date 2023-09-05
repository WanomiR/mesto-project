// ---------- Imports ------------ //

import "./pages/index.css";
import {enableValidation} from "./components/validate.js";
import {loadInitialCards} from "./components/cards.js";
import {
    openPopup,
    closePopup,
    submitFormCard,
    submitFormProfile,
    updateProfileForm,
    formElementCard,
    formElementProfile,
} from "./components/modal.js"
import {selectorsSet, loadUserInfo} from "./components/utils.js";

// ---------- Variables ---------- //

// popup elements
const popupElementsList = Array.from(document.querySelectorAll(".popup"))
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");


// ---------- Listeners ---------- //

// open popups functionality
profileEditButton.addEventListener("click", () => {
    updateProfileForm();
    openPopup(popupProfile);
});
addCardButton.addEventListener("click", () => {
    openPopup(popupCard);
});

// close popups functionality
popupElementsList.forEach((popupElement) => {
    const closeButton = popupElement.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => {
        closePopup(popupElement);
    });
    popupElement.addEventListener("click", (evt) => {
        closePopup(evt.target);
    });
});

// submit form listeners
formElementCard.addEventListener("submit", submitFormCard);
formElementProfile.addEventListener("submit", submitFormProfile);


// ---------- Functions ---------- //

// load user info
loadUserInfo();
// load the initial set of cards
loadInitialCards();
// enable forms validation

enableValidation(selectorsSet);

// ---------- Test Zone ---------- //
