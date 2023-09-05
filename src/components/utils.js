// ---------- Variables ---------- //

// selectors for enabling forms validation
import {getUserInfo} from "./api";
import {profileAvatar, profileDescription, profileName} from "./modal.js";

const selectorsSet = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active"
}



// ---------- Functions ---------- //

const disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
}

const enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
}


const loadProfileData = () => {
    getUserInfo()
        .then(userInfo => {
            profileName.textContent = userInfo.name;
            profileDescription.textContent = userInfo["about"];
            profileAvatar.src = userInfo["avatar"];
        })
        .catch(err => console.log(err))
}


// ---------- Exports ----------- //

export {selectorsSet, disableButton, enableButton, loadProfileData}