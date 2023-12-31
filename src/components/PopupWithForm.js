import Popup from "./Popup";

/**
 * Обработка попапов с формами.
 */
export default class PopupWithForm extends Popup {
    _formElement;
    _submitButton;
    _inputsList;
    _handlerSubmitForm;

    /**
     * Создать попап.
     * @param selectorPopup {String} - селектор попапа.
     * @param formSubmitCallback {Function} - колбэк сабмита формы.
     * @param clearFieldsHandler {Function} - очистка полей формы.
     */
    constructor({selectorPopup, formSubmitCallback, clearFieldsHandler}) {
        super(selectorPopup);
        this._formElement = this._popupElement.querySelector(".form");
        this._submitButton = this._popupElement.querySelector(".form__submit-button")
        this._inputsList = this._formElement.querySelectorAll(".form__input");
        this._handlerSubmitForm = formSubmitCallback;
        this._clearFieldsHandler = clearFieldsHandler;
    }

    /**
     * Получить список значений инпутов.
     * @returns {Array} - массив значение имя-значение.
     * @private
     */
    _getInputValues() {
        const inputValues = {};
        this._inputsList.forEach(input => inputValues[input.name] = input.value);
        return inputValues
    }

    /**
     * Закрытие попапа как в родителе, но с очищением полей.
     */
    close() {
        super.close();
        setTimeout(() => {
            this._formElement.reset();
            this._clearFieldsHandler();
        }, 500);
    }

    /**
     * Устанавливает на попап все необходимые слушатели.
     */
    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener("submit", evt => {
            evt.preventDefault();

            this._handlerSubmitForm(this._getInputValues());
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
