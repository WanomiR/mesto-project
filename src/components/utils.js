// ---------- Variables ---------- //

// selectors for enabling forms validation
import {getUserInfo} from "./api";
import {profileDescription, profileName} from "./modal.js";

const selectorsSet = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active"
}

// set of cards to load during initialization
const cardsInitialSet = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'фотография склонов гор покрытых зеленью и снегом'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'фотография реки с заснеженными берегами'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'вечерняя фотография панельных домов жилого райна, в окнах горит теплый свет'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'фотография подножья горы с редкой растительностью'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'фотография леса с железной дорогой, уходящей в горизонт по прямой линии'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'фотография скалистых склонов на побережье озера'
    }
];




// ---------- Functions ---------- //

const disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
}

const enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
}


const loadUserInfo = () => {
    getUserInfo()
        .then(userInfo => {
            profileName.textContent = userInfo.name;
            profileDescription.textContent = userInfo.about;
        })
        .catch(err => console.log(err))
}


// ---------- Exports ----------- //

export {selectorsSet, cardsInitialSet, disableButton, enableButton, loadUserInfo}