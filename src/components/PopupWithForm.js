import Popup from "./Popup";

/**
 * Обработка попапов с формами.
 */
export default class PopupWithForm extends Popup {
    _formElement;
    _handlerSubmitForm;
    _submitButton;

    /**
     * Создать попап.
     * @param selectorPopup {String} - селектор попапа.
     * @param formSubmitCallback {Function} - колбэк сабмита формы.
     */
    constructor(selectorPopup, formSubmitCallback) {
        super(selectorPopup);
        this._handlerSubmitForm = formSubmitCallback;
        this._formElement = this._popupElement.querySelector("form");
        this._submitButton = this._popupElement.querySelector(".form__submit-button")
    }

    /**
     * Получить список значений инпутов.
     * @returns {Array} - массив значение имя-значение.
     * @private
     */
    _getInputValues() {
        const inputsList = this._formElement.querySelectorAll(".form__input");
        const inputValues = {};
        inputsList.forEach(input => inputValues[input.name] = input.value);
        return inputValues
    }

    /**
     * Закрытие попапа как в родителе, но с очищением полей.
     */
    close() {
        super.close();
        setTimeout(() => this._formElement.reset(), 1000)
    }

    /**
     * Устанавливает на попап все необходимые слушатели.
     */
    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener("submit", evt => {
            evt.preventDefault();

            this._handlerSubmitForm(this._getInputValues());
            this.close();
        });
    }

    /**
     * Отображение процесса загрузки на кнопке сабмита.
     * @param isLoading {boolean} - состояние загрузки.
     */
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = "Сохранить";
        }
    }

}
