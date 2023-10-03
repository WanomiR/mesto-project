import PopupWithForm from "./PopupWithForm";

export function handleDeleteCard(api, card, cardId) {
    const popupConfirmDelete = new PopupWithForm(".popup_type_confirm-delete", () => {
        api.deleteCard(cardId)
            .then(res => {
                console.log(res.message);
                card.remove();
            })
            .catch(err => console.log(err));
        popupConfirmDelete.close();
    })
    popupConfirmDelete.setEventListeners();
    popupConfirmDelete.open();
}

export function generateCard({Card, cardContent, cardSelectors, api, popupImage, userId}) {
    const card = new Card({
        cardContent, cardSelectors, api, userId,
        handleOpenPopup: (placeName, imageLink) => {
            popupImage.open(placeName, imageLink);
        },
        handleDeleteCard: (card, cardId) => {
            handleDeleteCard(api, card, cardId);
        },
        putLike: (cardId) => {
            api.putLike(cardId)
                .then(res => card.updateLikeButton(res.likes))
                .catch(err => console.log(err));
        },
        removeLike: (cardId) => {
            api.deleteLike(cardId)
                .then(res => card.updateLikeButton(res.likes))
                .catch(err => console.log(err));
        }
    })
    return card.generate();
}