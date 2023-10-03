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
        this._cardImage = this._cardElement.querySelector(this._selectors.image);
        this._likeButton = this._cardElement.querySelector(this._selectors.likeButton);
        this._likesCounter = this._cardElement.querySelector(this._selectors.likesCounter);
        this._deleteButton = this._cardElement.querySelector(this._selectors.deleteButton);

        cardTitle.textContent = this._content.name;
        this._cardImage.src = this._content.link;
        this._cardImage.alt = `Фото: ${this._content.name}`;

        this.updateLikeButton(this._content.likes);
        this._updateDeleteButton();
        this._setEventListeners();

        return this._cardElement;
    }

    /**
     * Обновление состояния кнопки лайка.
     * @param likes {Array} - массив лайков карточки с сервера.
     */
    updateLikeButton(likes) {
        if (this._content.likes !== likes) {
            this._content.likes = likes;
        }

        if (this._hasUserLike()) {
            this._likeButton.classList.add(this._selectors.likeButtonActive);
        } else {
            this._likeButton.classList.remove(this._selectors.likeButtonActive);
        }
        this._updateLikesCounter();
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
     * @private
     */
    _setEventListeners() {
        this._likeButton.addEventListener("click", evt => {
            this._handleLikeButton(evt);
        })
        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteCard(this._cardElement, this._content._id);
        })
        this._cardImage.addEventListener("click", () => {
            this._handleOpenPopup(this._content.name, this._content.link);
        })
    }

    /**
     * Отправка информации об установке или удалении лайка на карточке.
     * @param evt {Object} - объект события слушателя.
     * @private
     */
    _handleLikeButton() {
        if (!this._hasUserLike()) {
            this._putLike(this._content._id);
        } else {
            this._removeLike(this._content._id);
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
     * @private
     */
    _updateLikesCounter() {
        this._likesCounter.classList.add(this._selectors.likesCounterActive);
        this._likesCounter.textContent = this._content.likes.length;
    }

    /**
     * Отрисовка кнопки удаления, если карточка принадлежит владельцу.
     * @private
     */
    _updateDeleteButton() {
        if (this._isCardOwner()) {
            this._deleteButton.classList.add(this._selectors.deleteButtonActive);
        }
    }
}