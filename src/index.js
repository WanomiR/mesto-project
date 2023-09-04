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
    formElementProfile
} from "./components/modal.js"
import {selectorsSet} from "./components/utils.js";
// import {getResponse} from "./components/api";


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

// load the initial set of cards
loadInitialCards();
// enable forms validation
enableValidation(selectorsSet);

// ---------- Test Zone ---------- //

const makeRequest = (dir, headersParams, ...otherParams) => {
    return fetch(`https://mesto.nomoreparties.co/v1/plus-cohort-28/${dir}`, {
        headers: {
            authorization: "ae8892c5-a1e1-40d3-aba9-31eb2dd98185",
            ...headersParams
        },
        ...otherParams
    });
}


makeRequest("users/me", null, {method: "GET"})
    .then(res => res.json())
    .then(res => console.log(res));

// console.log(param)
// console.log(JSON.parse(param))

