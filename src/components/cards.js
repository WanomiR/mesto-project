// ---------- Imports ------------ //

import {closePopup, openPopup, popupTypeImage, profileName} from "./modal.js";
import {getInitialCards, putLike, deleteLike, deleteCardRequest} from "./api.js";
import {hasMyLike, updateLikeButtonState, createdByMe, } from "./utils.js";

// ---------- Variables ---------- //

const cardsContainer = document.querySelector(".places__grid");
const cardTemplate = document.querySelector(".card__template").content;

// variables for confirming deletion functionality
const popupConfirmDelete = document.querySelector(".popup_type_confirm-delete");
const formElementConfirmDelete = document.querySelector(".form_type_confirm-delete");


// ---------- Functions ---------- //

const createCard = (cardContent, cardTemplate, popupElement) => {

    const placeName = cardContent.name;
    const imageLink = cardContent.link;
    let imageAltText = "altTextPlaceholder"

    if (!!cardContent.alt) {
        imageAltText = cardContent.alt
    }

    // card elements
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likesCounter = cardElement.querySelector(".card__like-counter");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    // popup elements
    const popupTitle = popupElement.querySelector(".popup__title_image");
    const popupImage = popupElement.querySelector(".popup__image");
    // current user id
    const myUserId = profileName.dataset.userId;

    // update delete button state
    if (createdByMe(cardContent, myUserId)) {
        deleteButton.classList.add("card__delete-button_active");
    }

    cardTitle.textContent = placeName;
    cardImage.setAttribute("src", imageLink);
    cardImage.setAttribute("alt", imageAltText);

    updateLikeButtonState(likeButton, cardContent, likesCounter, myUserId);

    // like button functionality
    likeButton.addEventListener("click", (evt) => {
        const buttonElement = evt.target;
        if (!hasMyLike(cardContent, myUserId)) {
            putLike(cardContent._id)
                .then(cardContentUpdated => {
                    updateLikeButtonState(buttonElement, cardContentUpdated, likesCounter, myUserId);
                    buttonElement.classList.add("card__like-button_active")
                    cardContent = cardContentUpdated;
                })
        } else {
            deleteLike(cardContent._id)
                .then(cardContentUpdated => {
                    updateLikeButtonState(buttonElement, cardContentUpdated, likesCounter, myUserId);
                    buttonElement.classList.remove("card__like-button_active")
                    cardContent = cardContentUpdated;
                })
        }
    });

    // delete card functionality
    deleteButton.addEventListener("click", () => {
        const deleteCard = () => {

            deleteCardRequest(cardContent._id)
                // .then(res => console.log(res.message))
                .then(res => {
                    console.log(res.message)
                    deleteButton.closest(".card").remove();
                    closePopup(popupConfirmDelete);
                    formElementConfirmDelete.removeEventListener("submit", deleteCard);
                })
                .catch(err => console.log(err))

        }

        formElementConfirmDelete.addEventListener("submit", deleteCard);
        openPopup(popupConfirmDelete);
    });

    // open preview
    cardImage.addEventListener("click", () => {
        new Promise((resolve, reject) => {
            popupTitle.textContent = placeName;
            popupImage.setAttribute("src", imageLink);
            popupImage.setAttribute("alt", imageAltText);
            popupImage.onload = resolve;
            popupImage.onerror = reject;
        })
            .then(() => openPopup(popupElement))
            .catch(() => console.log("Image loading error"))
    });

    return cardElement;
}

const loadInitialCards = () => {
    getInitialCards()
        .then(cardsSet => {
            cardsSet.forEach(item => {
                cardsContainer.prepend(createCard(item, cardTemplate, popupTypeImage))
            })
        })
        .catch(err => console.log(err));
}

// ---------- Exports ----------- //

export {cardsContainer, createCard, loadInitialCards, cardTemplate}
