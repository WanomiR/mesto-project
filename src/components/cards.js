// ---------- Imports ------------ //

import {cardsInitialSet} from "./utils.js";
import {openPopup, popupTypeImage} from "./modal.js";


// ---------- Variables ---------- //

const cardsContainer = document.querySelector(".places__grid");
const cardTemplate = document.querySelector(".card__template").content;


// ---------- Functions ---------- //

const createCard = (cardContent, cardTemplate, popupElement, openPopupFunc) => {

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
        deleteButton.closest(".card").remove();
    });
    // open preview
    cardImage.addEventListener("click", () => {
        const imageLoadCallback = () => {
            openPopupFunc(popupElement);
        }
        popupTitle.textContent = placeName;
        popupImage.setAttribute("src", imageLink);
        popupImage.setAttribute("alt", imageAltText);
        popupImage.onload = imageLoadCallback;
    });

    return cardElement;
}

const loadInitialCards = () => {
    cardsInitialSet.forEach(item => {
        cardsContainer.prepend(createCard(item, cardTemplate, popupTypeImage, openPopup));
    });
}

// ---------- Exports ----------- //
export {cardsContainer, createCard, loadInitialCards, cardTemplate}
