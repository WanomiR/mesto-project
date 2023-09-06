// ---------- Imports ------------ //

import {cardsContainer, cardTemplate, createCard} from "./cards.js"
import {hideInputError} from "./validate.js";
import {selectorsSet, disableButton, enableButton} from "./utils.js";
import {patchAvatar, patchUserInfo, postNewCard} from "./api.js";


// ---------- Variables ---------- //

// popup elements
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupTypeCard = document.querySelector(".popup_type_card");
// profile elements
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
// form elements
const forms = document.forms
// profile form elements
const formElementProfile = forms.userInfo;
const inputName = formElementProfile.elements.userName;
const inputDescription = formElementProfile.elements.userDescription;
const submitButtonProfile = formElementProfile.elements.submitButton;
// avatar form elements
const formElementAvatar = forms.profileAvatar;
const avatarLink = formElementAvatar.elements.avatarLink;
const submitButtonAvatar = formElementAvatar.elements.submitButton;
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
    patchUserInfo(inputName.value, inputDescription.value)
        .then(userInfo => {
            profileName.textContent = userInfo.name;
            profileDescription.textContent = userInfo.about;
        })
        .catch(err => console.log(err));
    closePopup(popupTypeProfile);
}

const submitFormAvatar = () => {
    patchAvatar(avatarLink.value)
        .then(userInfo => {
            profileAvatar.src = userInfo.avatar;
        })
        .catch(err => console.log(err));
    closePopup(popupAvatar);
    formElementAvatar.reset();
    disableButton(submitButtonAvatar, selectorsSet.inactiveButtonClass);
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
    postNewCard(placeName.value, imageLink.value)
        .then(cardContent => {
            cardsContainer.prepend(createCard(cardContent, cardTemplate, popupTypeImage, openPopup));
        })
        .catch(err => console.log(err))
    
    closePopup(popupTypeCard);
    // clear the form inputs and update button state
    formElementCard.reset()
    disableButton(submitButtonCard, selectorsSet.inactiveButtonClass);
}


// ---------- Exports ----------- //

export {
    formElementCard,
    formElementProfile,
    formElementAvatar,
    openPopup,
    closePopup,
    closeByEscape,
    submitFormCard,
    submitFormProfile,
    submitFormAvatar,
    popupTypeImage,
    forms,
    updateProfileForm,
    profileName,
    profileDescription,
    profileAvatar
}