export default class FormValidator {
    constructor(formSelectors, formElement) {
        this._selectors = formSelectors;
        this._form = formElement;
    }

    _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    }

    _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = "";
    }


    _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("")
        }

        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
        } else {
            this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid);
    }

    _disableButton(buttonElement, inactiveButtonClass) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    }

    _enableButton(buttonElement, inactiveButtonClass) {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }

    _toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            this._disableButton(buttonElement, inactiveButtonClass);
        } else {
            this._enableButton(buttonElement, inactiveButtonClass);
        }
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            document.querySelector(".popup_opened").classList.remove("popup_opened")
        }
    }

    enableValidation() {
        const inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
        const buttonElement = this._form.querySelector(this._selectors.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement, this._selectors.inactiveButtonClass);
        inputList.forEach((inputElement) => {
            this._hideInputError(this._form, inputElement, this._selectors.inputErrorClass, this._selectors.errorClass);
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(this._form, inputElement, this._selectors.inputErrorClass, this._selectors.errorClass);
                this._toggleButtonState(inputList, buttonElement, this._selectors.inactiveButtonClass);
            });
            inputElement.addEventListener("keyup", this._handleEscClose)
        });
    }
}
