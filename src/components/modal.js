// ---------- Imports ------------ //

import {cardsContainer, cardTemplate, createCard} from "./cards.js"
import {hideInputError} from "./validate.js";
import {selectorsSet, disableButton, enableButton} from "./utils.js";


// ---------- Variables ---------- //

// popup elements
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypeCard = document.querySelector(".popup_type_card");
// profile elements
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
// form elements
const forms = document.forms
// profile form elements
const formElementProfile = forms.userInfo;
const inputName = formElementProfile.elements.userName;
const inputDescription = formElementProfile.elements.userDescription;
const submitButtonProfile = formElementProfile.elements.submitButton;
// add-card form elements
const formElementCard = forms.card;
const placeName = formElementCard.elements.placeName;
const imageLink = formElementCard.elements.imageLink;
const submitButtonCard = formElementCard.elements.submitButton;


// ---------- Functions ---------- //

const closeByEscape = evt => {
    const popupElement = evt.currentTarget.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(popupElement);
    }
}

const openPopup = popupElement => {
    popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", closeByEscape);
}

const closePopup = popupElement => {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", closeByEscape);
}

function submitFormProfile() {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupTypeProfile);
}

const updateProfileForm = () => {
    const inputList = Array.from([inputName, inputDescription]);

    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;

    inputList.forEach(inputElement => {
        hideInputError(
            formElementProfile, inputElement, selectorsSet.inputErrorClass, selectorsSet.errorClass
        );
    });
    enableButton(submitButtonProfile, selectorsSet.inactiveButtonClass);
}


function submitFormCard() {
    const cardContent = {
        name: placeName.value,
        link: imageLink.value
    }
    cardsContainer.prepend(createCard(cardContent, cardTemplate, popupTypeImage, openPopup));
    closePopup(popupTypeCard);
    // clear the form inputs and update button state
    formElementCard.reset()
    disableButton(submitButtonCard, selectorsSet.inactiveButtonClass);
}


// ---------- Exports ----------- //

export {
    formElementCard,
    formElementProfile,
    openPopup,
    closePopup,
    closeByEscape,
    submitFormCard,
    submitFormProfile,
    popupTypeImage,
    forms,
    updateProfileForm
}