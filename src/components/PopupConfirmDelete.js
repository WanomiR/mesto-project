import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._callback = formSubmitCallback;
        this._form = this._popup.querySelector(".form")
        this._submitButton = this._popup.querySelector(".form__submit-button")
    }

    setEventListeners(buttonElement, cardId) {
        super.setEventListeners();
        this._submitButton.addEventListener("click", (evt) => {
            evt.preventDefault();
            this._callback(buttonElement, cardId);
        })
    }
}