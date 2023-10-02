import "../pages/index.css";
import {addNewCard, deleteCardPopupElement, renderGallery, viewImagePopupElement} from "./card";
import {
  removeClassToClosePopup, addingClassToOpenPopup, handlerClosePopupOnOverlayOrCloseBtn
} from "./modal";
import {
  alertError,
  associatePersonalInfo,
  bindProfileFields,
  clearForm,
  handlerEditingAvatar, showLoadingOnBtn,
  submitAddingPersonInfo
} from "./utils";
import {enableValidations} from "./validate";
import {validationConf} from "./config";
import {getCards, getPersonalInfo, postNewCard} from "./api";

/*Попапы*/
const editProfilePopupElement = document.querySelector("#editProfilePopup");
const addPlacePopupElement = document.querySelector("#addCardPopup");
const editAvatarPopupElement = document.querySelector("#editAvatar");

/*Кнопки для попапов*/
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

/*Поля профиля пользователя*/
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about");
const profileAvatarElement = document.querySelector(".profile__avatar");

/*Элементы попапов*/
const nameProfileInput = editProfilePopupElement.querySelector("#personName");
const aboutProfileInput = editProfilePopupElement.querySelector("#personAbout");
const editProfileForm = editProfilePopupElement.querySelector(".popup__form");
const addPlaceForm = addPlacePopupElement.querySelector(".popup__form");
const editAvatarBtn = document.querySelector(".profile__edit-avatar");
const editAvatarForm = editAvatarPopupElement.querySelector("form");
const submitPersonalInfoBtn = editProfileForm.querySelector(".popup__submit-btn");
const submitAvatarBtn = editAvatarForm.querySelector(".popup__submit-btn");
const submitAddingCartBtn = addPlaceForm.querySelector(".popup__submit-btn");
const name = addPlaceForm.querySelector("#placeName");
const url = addPlaceForm.querySelector("#placeURL");

const galleryElement = document.querySelector(".gallery");
const avatarElement = document.querySelector(".profile__avatar");

let myId = "";

/************************************/

/**
 * Помощник для добавления карточки.
 * @param evt {Object} - объект события.
 */
function handlerAddingCart(evt) {
  evt.preventDefault();

  showLoadingOnBtn("loading", submitAddingCartBtn);

  postNewCard(name.value, url.value)
    .then(data => {
      addNewCard(data, galleryElement, myId);
      removeClassToClosePopup(addPlacePopupElement);
      clearForm(addPlaceForm);
      removeEventListener("submit", handlerAddingCart);
    })
    .catch(alertError)
    .finally(() => {
      showLoadingOnBtn("done", submitAddingCartBtn);
    });
}

/**
 * Вспомогательная управляющая функция, которая помогает управлять попапом добавления новой карточки.
 */
function handlerAddingCardPopup() {
  addPlaceBtn.addEventListener("click", () => {
    clearForm(addPlacePopupElement.querySelector("form"));
    addingClassToOpenPopup(addPlacePopupElement);
    showLoadingOnBtn("disabled", submitAvatarBtn);
  });

  addPlacePopupElement.addEventListener("click", handlerClosePopupOnOverlayOrCloseBtn);

  addPlaceForm.addEventListener("submit", handlerAddingCart);
}

/**
 * Функция для управления поведением попапа редактирования информации пользователя.
 */
function handlerEditingPersonPopup() {
  editProfileBtn.addEventListener("click", () => {
    clearForm(editProfileForm);
    bindProfileFields(nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement);
    addingClassToOpenPopup(editProfilePopupElement);
    showLoadingOnBtn("default", submitPersonalInfoBtn);
  });
  submitAddingPersonInfo(editProfileForm, nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement, profileAvatarElement, editProfilePopupElement);

  editProfilePopupElement.addEventListener("click", handlerClosePopupOnOverlayOrCloseBtn);
}

/**
 *
 */
function handlerEditingAvatarPopup() {
  editAvatarBtn.addEventListener("click", () => {
    clearForm(editAvatarForm);
    addingClassToOpenPopup(editAvatarPopupElement);
    showLoadingOnBtn("default", submitAvatarBtn);
  });
  handlerEditingAvatar(editAvatarPopupElement, avatarElement);
}

Promise.all([getPersonalInfo(), getCards()])
  .then(data => {
    const [profileInfo, cards] = data;
    console.log(profileInfo);
    associatePersonalInfo(profileInfo, profileNameElement, profileAboutElement, profileAvatarElement);
    myId = profileInfo._id;

    console.log(cards);
    renderGallery(cards, galleryElement, myId);

  })
  .catch(alertError);

enableValidations(validationConf);
handlerAddingCardPopup();
handlerEditingPersonPopup();
handlerEditingAvatarPopup();
viewImagePopupElement.addEventListener("click", handlerClosePopupOnOverlayOrCloseBtn);
deleteCardPopupElement.addEventListener("click", handlerClosePopupOnOverlayOrCloseBtn);
editAvatarPopupElement.addEventListener("click", handlerClosePopupOnOverlayOrCloseBtn);
