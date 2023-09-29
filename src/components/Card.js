export default class Card {
    constructor({cardContent, cardSelectors, api, popupImage, popupConfirmDelete, userId}) {
        this._content = cardContent;
        this._selectors = cardSelectors;
        this._api = api;
        this._popup = popupImage;
        this._popupDelete = popupConfirmDelete;
        this._userId = userId;
    }

    generate() {
        const cardElement = this._getElement();
        const cardTitle = cardElement.querySelector(this._selectors.title);
        const cardImage = cardElement.querySelector(this._selectors.image);
        const likeButton = cardElement.querySelector(this._selectors.likeButton);
        const likesCounter = cardElement.querySelector(this._selectors.likesCounter);
        const deleteButton = cardElement.querySelector(this._selectors.deleteButton);

        cardTitle.textContent = this._content.name;
        cardImage.src = this._content.link;
        cardImage.alt = `Фото: ${this._content.name}`

        this._updateLikeButton(likeButton, likesCounter);
        this._updateDeleteButton(deleteButton);
        this._setEventListeners(likeButton, likesCounter, deleteButton, cardImage);

        return cardElement;
    }

    _getElement() {
        return document
            .querySelector(this._selectors.templateSelector)
            .content
            .querySelector(this._selectors.cardElement)
            .cloneNode(true);
    }

    _setEventListeners(likeButton, likesCounter, deleteButton, cardImage) {
        likeButton.addEventListener("click", evt => {
            this._handleLikeButton(evt, likesCounter);
        })
        deleteButton.addEventListener("click", (evt) => {
            this._popupDelete.setEventListeners(evt.target, this._content._id)
            this._popupDelete.open();
        })
        cardImage.addEventListener("click", () => {
            this._popup.open(this._content.name, this._content.link);
        })
    }

    _handleLikeButton(evt, likesCounter) {
        const buttonElement = evt.target;
        if (!this._hasUserLike()) {
            this._api.putLike(this._content._id)
                .then(res => {
                    this._content.likes = res.likes
                    this._updateLikeButton(buttonElement, likesCounter)
                    buttonElement.classList.add(this._selectors.likeButtonActive)
                })
                .catch(err => console.log(`Error: ${err}`));
        } else {
            this._api.deleteLike(this._content._id)
                .then(res => {
                    this._content.likes = res.likes
                    this._updateLikeButton(buttonElement, likesCounter)
                    buttonElement.classList.remove(this._selectors.likeButtonActive)
                })
                .catch(err => console.log(`Error: ${err}`));
        }
    }

    _isCardOwner() {
        return this._content.owner._id === this._userId;
    }

    _hasUserLike() {
        return this._content.likes.some(userData => {
            return userData._id === this._userId;
        });
    }

    _updateLikesCounter(likesCounter) {
        const nLikes = this._content.likes.length;
        if (nLikes > 0) {
            likesCounter.classList.add(this._selectors.likesCounterActive);
            likesCounter.textContent = nLikes;
        } else {
            likesCounter.textContent = "";
            likesCounter.classList.remove(this._selectors.likesCounterActive);
        }
    }

    _updateLikeButton(likeButton, likesCounter) {
        if (this._hasUserLike()) {
            likeButton.classList.add(this._selectors.likeButtonActive);
        } else {
            likeButton.classList.remove(this._selectors.likeButtonActive);
        }
        this._updateLikesCounter(likesCounter)
    }

    _updateDeleteButton(deleteButton) {
        if (this._isCardOwner()) {
            deleteButton.classList.add(this._selectors.deleteButtonActive)
        }
    }
}
