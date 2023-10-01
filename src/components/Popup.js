/**
 * Базовый класс для работы с попапом.
 */
export default class Popup {
    _popupElement;

    /**
     * Создать попап.
     * @param popupSelector {String} - селектор попапа.
     */
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    /**
     * Метод позволяет отрабатывать нажатие на Esc.
     * @param evt {Object} - событие эвента.
     * @private
     */
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    /**
     * Открытие попапа кликом.
     */
    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keyup", this._handleEscClose.bind(this));
    }

    /**
     * Закрытие попапа кликом на кнопку, оверлей или Esc.
     */
    close() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keyup", this._handleEscClose.bind(this));
    }

    /**
     * Устанавливает на попап все необходимые слушатели.
     */
    setEventListeners() {
        this._popupElement.addEventListener("click", evt => {
            if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
                this.close();
            }
        });
    }
}
