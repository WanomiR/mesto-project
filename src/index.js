// ---------- Imports ------------ //

import "./pages/index.css";
import {enableValidation} from "./components/validate";
import {loadCards} from "./components/cards";
import {
    popupTypeProfile,
    popupTypeAvatar,
    popupTypeCard,
    openPopup,
    closePopup,
    submitFormCard,
    submitFormProfile,
    submitFormAvatar,
    updateProfileForm,
    formElementCard,
    formElementProfile,
    formElementAvatar
} from "./components/modal"
import {selectorsSet, updateProfile} from "./components/utils";

// ---------- Variables ---------- //

const popupElementsList = Array.from(document.querySelectorAll(".popup"))
const profileEditButton = document.querySelector(".profile__edit-button");
const avatarEditButton = document.querySelector(".profile__edit-avatar-button");
const addCardButton = document.querySelector(".profile__add-button");


// ---------- Listeners ---------- //

// open popup functionality
profileEditButton.addEventListener("click", () => {
    updateProfileForm();
    openPopup(popupTypeProfile);
});

avatarEditButton.addEventListener("click", () => {
    openPopup(popupTypeAvatar);
})

addCardButton.addEventListener("click", () => {
    openPopup(popupTypeCard);
});

// close popup functionality
popupElementsList.forEach((popupElement) => {
    const closeButton = popupElement.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => {
        closePopup(popupElement);
    });
    popupElement.addEventListener("click", (evt) => {
        closePopup(evt.target);
    });
});

// submit forms
formElementCard.addEventListener("submit", submitFormCard);
formElementProfile.addEventListener("submit", submitFormProfile);
formElementAvatar.addEventListener("submit", submitFormAvatar);


// ---------- Functions ---------- //

updateProfile(); // load profile data
loadCards();  // load cards from the server
enableValidation(selectorsSet); // enable forms validation

