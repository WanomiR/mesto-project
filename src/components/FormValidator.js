/**
 * Установка и запуск валидации.
 */
export default class FormValidator {
    /**
     * Создание.
     * @param formSelectors {Object} - объект с селекторами форм.
     * @param formElement {Object} - элемент формы.
     */
    constructor(formSelectors, formElement) {
        this._selectors = formSelectors;
        this._form = formElement;
        this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
        this._buttonElement = this._form.querySelector(this._selectors.submitButtonSelector);
    }

    /**
     * Отрисовка текста ошибки.
     * @param inputElement {Object} - элемент ввода, для которого отрисовываем ошибку.
     * @param errorMessage {String} - текст ошибки.
     * @private
     */
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
    }

    /**
     * Скрыть поле с текстом ошибки.
     * @param inputElement {Object} - элемент ввода, для которого убираем текст.
     * @private
     */
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = "";
    }

    /**
     * Проверка валидности введенного значения в поле и отрисовка ошибки.
     * @param inputElement {Object} - проверяемое поле ввода.
     * @private
     */
    _checkInputValidity(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    /**
     * Проверка формы на наличие хоть одного невалидного поля.
     * @returns {boolean} - true если есть хоть одно.
     * @private
     */
    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    /**
     * Отключение кнопки подтверждения при невалидных полях.
     * @private
     */
    _disableButton() {
        this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", true);
    }

    /**
     * Включение кнопки подтверждения при валидных полях.
     * @private
     */
    _enableButton() {
        this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled");
    }

    /**
     * Проверка и переключение состояния кнопки.
     * @private
     */
    _toggleButtonState () {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    enableValidation() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);

            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    /**
     * Скрытие всех полей с ошибками в форме по списку.
     */
    clearInputErrors() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        })
        this._toggleButtonState();
    }
}
