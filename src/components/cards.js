// ---------- Imports ------------ //

import {cardsInitialSet} from "./utils.js";
import {closePopup, openPopup, popupTypeImage} from "./modal.js";
import {getInitialCards} from "./api";


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
    const deleteButton = cardElement.querySelector(".card__delete-button");
    // popup elements
    const popupTitle = popupElement.querySelector(".popup__title_image");
    const popupImage = popupElement.querySelector(".popup__image");

    cardTitle.textContent = placeName;
    cardImage.setAttribute("src", imageLink);
    cardImage.setAttribute("alt", imageAltText);

    // toggle like
    cardElement.querySelector(".card__like-button").addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like-button_active");
    });

    // delete card
    deleteButton.addEventListener("click", () => {
        const deleteCard = () => {
            deleteButton.closest(".card").remove();
            closePopup(popupConfirmDelete);
            formElementConfirmDelete.removeEventListener("submit", deleteCard);
        }

        formElementConfirmDelete.addEventListener("submit", deleteCard);
        openPopup(popupConfirmDelete);
    });
    // open preview
    cardImage.addEventListener("click", () => {
        new Promise((resolve) => {
            popupTitle.textContent = placeName;
            popupImage.setAttribute("src", imageLink);
            popupImage.setAttribute("alt", imageAltText);
            popupImage.onload = resolve;
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
