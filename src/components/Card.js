/**
 * Создание и работа карточки
 */
export default class Card {
    /**
     * Создать карточку.
     * @param cardContent {Object} - данные карточки с сервера.
     * @param cardSelectors {Object} - объект с селекторами.
     * @param handleOpenPopup {Function} - обработчик открытия попапа.
     * @param handleDeleteCard {Function} - обработчик удаления карточки.
     * @param putLike {Function} - отправка установки лайка на сервер.
     * @param removeLike {Function} - отправка удаления лайка на сервер.
     * @param userId {String} - ID пользователя.
     */
    constructor({
                    cardContent,
                    cardSelectors,
                    handleOpenPopup,
                    handleDeleteCard,
                    putLike,
                    removeLike,
                    userId
                }) {
        this._content = cardContent;
        this._selectors = cardSelectors;
        this._handleDeleteCard = handleDeleteCard;
        this._handleOpenPopup = handleOpenPopup;
        this._putLike = putLike;
        this._removeLike = removeLike;
        this._userId = userId;
    }

    /**
     * Сборка карточки.
     * @returns {Object} - готовая к вставке наполненная карточка.
     */
    generate() {
        this._cardElement = this._getElement();
        const cardTitle = this._cardElement.querySelector(this._selectors.title);
        const cardImage = this._cardElement.querySelector(this._selectors.image);
        const likeButton = this._cardElement.querySelector(this._selectors.likeButton);
        const likesCounter = this._cardElement.querySelector(this._selectors.likesCounter);
        const deleteButton = this._cardElement.querySelector(this._selectors.deleteButton);

        cardTitle.textContent = this._content.name;
        cardImage.src = this._content.link;
        cardImage.alt = `Фото: ${this._content.name}`;

        this.updateLikeButton(likeButton, likesCounter, this._content.likes);
        this._updateDeleteButton(deleteButton);
        this._setEventListeners(likeButton, likesCounter, deleteButton, cardImage);

        return this._cardElement;
    }

    /**
     * Обновление состояния кнопки лайка.
     * @param likeButton {Object} - кнопка лайка.
     * @param counterElement {Object} - счетчик лайков.
     * @param likes {Array} - массив лайков карточки с сервера.
     */
    updateLikeButton(likeButton, counterElement, likes) {
        if (this._content.likes !== likes) {
            this._content.likes = likes;
        }

        if (this._hasUserLike()) {
            likeButton.classList.add(this._selectors.likeButtonActive);
        } else {
            likeButton.classList.remove(this._selectors.likeButtonActive);
        }
        this._updateLikesCounter(counterElement);
    }

    /**
     * Получить элемент карточки из шаблона.
     * @returns {Node} - готовая к обработке карточка.
     * @private
     */
    _getElement() {
        return document
            .querySelector(this._selectors.templateSelector)
            .content
            .querySelector(this._selectors.cardElement)
            .cloneNode(true);
    }

    /**
     * Установка слушателей на карточку.
     * @param likeButton {Element} - кнопка лайка.
     * @param likesCounter {Element} - счетчик лайков.
     * @param deleteButton {Element} - кнопка удаления карточки.
     * @param cardImage {Element} - изображение карточки.
     * @private
     */
    _setEventListeners(likeButton, likesCounter, deleteButton, cardImage) {
        likeButton.addEventListener("click", evt => {
            this._handleLikeButton(evt, likesCounter);
        })
        deleteButton.addEventListener("click", () => {
            this._handleDeleteCard(this._cardElement, this._content._id);
        })
        cardImage.addEventListener("click", () => {
            this._handleOpenPopup(this._content.name, this._content.link);
        })
    }

    /**
     * Отправка информации об установке или удалении лайка на карточке.
     * @param evt {Object} - объект события слушателя.
     * @param likesCounter {Element} - счетчик лайков.
     * @private
     */
    _handleLikeButton(evt, likesCounter) {
        const buttonElement = evt.target;
        if (!this._hasUserLike()) {
            this._putLike(this._content._id, buttonElement, likesCounter);
        } else {
            this._removeLike(this._content._id, buttonElement, likesCounter);
        }
    }

    /**
     * Проверка является ли пользователь владельцем карточки.
     * @returns {boolean} - владелец если true.
     * @private
     */
    _isCardOwner() {
        return this._content.owner._id === this._userId;
    }

    /**
     * Проверка установки текущим пользователем лайка на карточке.
     * @returns {boolean} - если текущий пользователь ставил лайк - true.
     * @private
     */
    _hasUserLike() {
        return this._content.likes.some(userData => {
            return userData._id === this._userId;
        });
    }

    /**
     * Отрисовка счетчика лайков.
     * @param likesCounter {Element} - элемент счетчика лайков.
     * @private
     */
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

    /**
     * Отрисовка кнопки удаления, если карточка принадлежит владельцу.
     * @param deleteButton {Element} - элемент кнопки.
     * @private
     */
    _updateDeleteButton(deleteButton) {
        if (this._isCardOwner()) {
            deleteButton.classList.add(this._selectors.deleteButtonActive);
        }
    }
}