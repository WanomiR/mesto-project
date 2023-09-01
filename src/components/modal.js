// ---------- Imports ------------ //

import { cardsContainer, cardTemplate, createCard } from "./cards.js"

// ---------- Variables ---------- //

const forms = document.forms
// popup elements
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypeCard = document.querySelector(".popup_type_card");
// profile elements
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

// ---------- Functions ---------- //

function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
}

// functions for submitting forms
function submitFormProfile() {
    profileName.textContent = forms.userInfo.elements.userName.value;
    profileDescription.textContent = forms.userInfo.elements.userDescription.value;
    closePopup(popupTypeProfile);
}

function submitFormCard(evt) {
    const cardContent = {
        name: forms.card.elements.placeName.value,
        link: forms.card.elements.imageLink.value
    }
    cardsContainer.prepend(createCard(cardContent, cardTemplate, popupTypeImage, openPopup));
    closePopup(popupTypeCard);
    // clear the form inputs
    forms.card.reset()
}

// ---------- Exports ----------- //

export { openPopup, closePopup, submitFormCard, submitFormProfile, popupTypeImage }