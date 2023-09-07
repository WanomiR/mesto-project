// ---------- Imports ------------ //

import {cardsContainer, cardTemplate, createCard} from "./cards"
import {hideInputError} from "./validate";
import {selectorsSet, disableButton, enableButton, renderLoading} from "./utils";
import {patchAvatar, patchUserInfo, postNewCard} from "./api";


// ---------- Variables ---------- //

// popup elements
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupTypeCard = document.querySelector(".popup_type_card");
const popupTypeConfirmDelete = document.querySelector(".popup_type_confirm-delete");
// profile elements
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");

// form elements
const forms = document.forms
const formElementProfile = forms.userInfo;
const inputName = formElementProfile.elements.userName;
const inputDescription = formElementProfile.elements.userDescription;
const submitButtonProfile = formElementProfile.elements.submitButton;
const formElementAvatar = forms.profileAvatar;
const avatarLink = formElementAvatar.elements.avatarLink;
const submitButtonAvatar = formElementAvatar.elements.submitButton;
const formElementCard = forms.card;
const placeName = formElementCard.elements.placeName;
const imageLink = formElementCard.elements.imageLink;
const submitButtonCard = formElementCard.elements.submitButton;
const formElementConfirmDelete = document.querySelector(".form_type_confirm-delete");


// ---------- Functions ---------- //

const closePopupByEscape = evt => {
    const popupElement = evt.currentTarget.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(popupElement);
    }
}

const openPopup = popupElement => {
    popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", closePopupByEscape);
}

const closePopup = popupElement => {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", closePopupByEscape);
}

function submitFormProfile() {
    renderLoading(submitButtonProfile, true);
    patchUserInfo(inputName.value, inputDescription.value)
        .then(userInfo => {
            closePopup(popupTypeProfile);
            profileName.textContent = userInfo.name;
            profileDescription.textContent = userInfo.about;
        })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(submitButtonProfile, false)
        });
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


const submitFormAvatar = () => {
    renderLoading(submitButtonAvatar, true);
    patchAvatar(avatarLink.value)
        .then(userInfo => {
            closePopup(popupTypeAvatar);
            profileAvatar.src = userInfo.avatar;
        })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(submitButtonAvatar, false);
            formElementAvatar.reset();
            disableButton(submitButtonAvatar, selectorsSet.inactiveButtonClass);
    });
}


function submitFormCard() {
    renderLoading(submitButtonCard, true);
    postNewCard(placeName.value, imageLink.value)
        .then(cardContent => {
            closePopup(popupTypeCard);
            cardsContainer.prepend(createCard(cardContent, cardTemplate, profileName.dataset.userId));
        })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(submitButtonCard, false);
            formElementCard.reset();
            disableButton(submitButtonCard, selectorsSet.inactiveButtonClass);
        })
    
}


// ---------- Exports ----------- //

export {
    popupTypeProfile,
    popupTypeAvatar,
    popupTypeCard,
    popupTypeImage,
    popupTypeConfirmDelete,
    openPopup,
    closePopup,
    profileName,
    profileDescription,
    profileAvatar,
    forms,
    formElementCard,
    formElementProfile,
    formElementAvatar,
    formElementConfirmDelete,
    updateProfileForm,
    submitFormCard,
    submitFormProfile,
    submitFormAvatar,
}