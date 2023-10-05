import Popup from "./Popup";


export default class PopupConfirm extends Popup {
    constructor({selectorPopup, formSubmitCallback}) {
        super(selectorPopup);
        this._formElement = this._popupElement.querySelector(".form");
        this._hanldeSubmitForm = formSubmitCallback;
    }

    setEventListeners(cardElement, cardId, card) {
        super.setEventListeners();

        this._formElement.addEventListener("submit", evt => {
            evt.preventDefault();
            this._hanldeSubmitForm(cardElement, cardId, card);
        })
    }
}