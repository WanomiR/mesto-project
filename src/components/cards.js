// ---------- Imports ------------ //

import {
    popupTypeImage,
    popupTypeConfirmDelete,
    closePopup,
    openPopup,
    profileName,
    formElementConfirmDelete,
} from "./modal";
import {requestCardsInfo, putLike, deleteLike, requestCardDeletion} from "./api";
import {hasMyLike, updateLikeButtonState, cardOwner,} from "./utils";


// ---------- Variables ---------- //

const cardsContainer = document.querySelector(".places__grid");
const cardTemplate = document.querySelector(".card__template").content;
// popup elements
const popupTitle = document.querySelector(".popup__title_image");
const popupImage = document.querySelector(".popup__image");


// ---------- Functions ---------- //

const createCard = (cardContent, cardTemplate, profileUserId) => {

    const placeName = cardContent.name;
    const imageLink = cardContent.link;
    let imageAltText = "alt text placeholder"

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

    // update delete button state
    if (cardOwner(cardContent, profileUserId)) {
        deleteButton.classList.add("card__delete-button_active");
    }

    cardTitle.textContent = placeName;
    cardImage.src = imageLink;
    cardImage.alt = imageAltText;

    updateLikeButtonState(likeButton, cardContent, likesCounter, profileUserId);

    // like button functionality
    likeButton.addEventListener("click", (evt) => {
        const buttonElement = evt.target;
        if (!hasMyLike(cardContent, profileUserId)) {
            putLike(cardContent["_id"])
                .then(cardContentUpdated => {
                    updateLikeButtonState(buttonElement, cardContentUpdated, likesCounter, profileUserId);
                    buttonElement.classList.add("card__like-button_active");
                    cardContent = cardContentUpdated;
                });
        } else {
            deleteLike(cardContent["_id"])
                .then(cardContentUpdated => {
                    updateLikeButtonState(buttonElement, cardContentUpdated, likesCounter, profileUserId);
                    buttonElement.classList.remove("card__like-button_active");
                    cardContent = cardContentUpdated;
                });
        }
    });

    // delete card button functionality
    deleteButton.addEventListener("click", () => {
        const deleteCard = () => {
            requestCardDeletion(cardContent["_id"])
                .then(res => {
                    console.log(res.message)
                    deleteButton.closest(".card").remove();
                    closePopup(popupTypeConfirmDelete);
                    formElementConfirmDelete.removeEventListener("submit", deleteCard);
                })
                .catch(err => console.log(err))
        }

        formElementConfirmDelete.addEventListener("submit", deleteCard);
        openPopup(popupTypeConfirmDelete);
    });

    // open preview
    cardImage.addEventListener("click", () => {
        new Promise((resolve, reject) => {
            popupTitle.textContent = placeName;
            popupImage.src = imageLink;
            popupImage.alt = imageAltText;
            popupImage.onload = resolve;
            popupImage.onerror = reject;
        })
            .then(() => openPopup(popupTypeImage))
            .catch(() => console.log("Image loading error"))
    });

    return cardElement;
}

const loadCards = () => {
    requestCardsInfo()
        .then(cardsSet => {
            cardsSet.forEach(cardContents => {
                cardsContainer.prepend(createCard(cardContents, cardTemplate, profileName.dataset.userId))
            });
        })
        .catch(err => console.log(err));
}


// ---------- Exports ----------- //

export {cardsContainer, cardTemplate, createCard, loadCards, }
