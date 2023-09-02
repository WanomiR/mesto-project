// ---------- Imports ------------ //
import {disableButton, enableButton} from "./utils.js";


// ---------- Functions ---------- //

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("")
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        enableButton(buttonElement, inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
}

const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, params.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", (evt) => {
            checkInputValidity(formElement, inputElement, params.inputErrorClass, params.errorClass);
            toggleButtonState(inputList, buttonElement, params.inactiveButtonClass);
        });
        inputElement.addEventListener("keyup", evt => {
            if (evt.key === "Escape") {
                document.querySelector(".popup_opened").classList.remove("popup_opened")
            }
        })
    });
}

const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, params);
    });
}

// ---------- Exports ----------- //

export {enableValidation, toggleButtonState, hideInputError };
