import {removeClassToClosePopup} from "./modal";
import {disableSubmitButton, hideInputError} from "./validate";
import {validationConf} from "./config";
import {deleteCard, updateAvatar, updatePersonalInfo} from "./api";
import {deleteCardPopupElement} from "./card";

let cardId = "";
let cardElement;

/**
 * Функция связывает поля профиля с полями формы редактирования профиля.
 */
export function bindProfileFields(nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement) {
  nameProfileInput.value = profileNameElement.textContent;
  aboutProfileInput.value = profileAboutElement.textContent;
}

/**
 * Обрабатывает сабмит формы редактирования персональных данных.
 * Прокидывает значения из полей формы и сбрасывает их значение.
 * @param editProfileForm
 * @param nameProfileInput
 * @param aboutProfileInput
 * @param profileNameElement
 * @param profileAboutElement
 * @param profileAvatarElement
 * @param editProfilePopupElement
 */
export function submitAddingPersonInfo(editProfileForm, nameProfileInput, aboutProfileInput, profileNameElement, profileAboutElement, profileAvatarElement, editProfilePopupElement) {
  const submitFormBtn = editProfileForm.querySelector(".popup__submit-btn");

  editProfileForm.addEventListener("submit", evt => {
    evt.preventDefault();

    showLoadingOnBtn("loading", submitFormBtn);

    updatePersonalInfo(nameProfileInput.value, aboutProfileInput.value)
      .then((data) => {
        associatePersonalInfo(data, profileNameElement, profileAboutElement, profileAvatarElement);
        editProfileForm.reset();
        removeClassToClosePopup(editProfilePopupElement);
      })
      .catch(alertError)
      .finally(() => {
        showLoadingOnBtn("done", submitFormBtn);
      });
  });
}

/**
 * Очищение всех полей с ошибкой в форме.
 * @param form {Object} - форма в которой зачищаем поля.
 * @param validationConf {Object} - конфигурация.
 */
export function clearAllErrorFields(form, validationConf) {
  const inputsList = Array.from(form.querySelectorAll(validationConf.inputClass));

  inputsList.forEach(input => {
    hideInputError(form, input, validationConf);
  });
}

/**
 * Позволяет сбросить значения полей формы, очистить поля с
 * ошибками и деактивировать кнопку сабмита.
 * @param form {Object} - форма, которую очищаем.
 */
export function clearForm(form) {
  form.reset();
  clearAllErrorFields(form, validationConf);
  disableSubmitButton(form, validationConf);
}

/**
 * Позволяет отрисовать персональные данные на странице.
 * @param info {Response} - персональные данные с сервера.
 * @param info.about {Text} - занятие пользователя.
 * @param info.avatar {URL} - url на аватар пользователя.
 * @param info.name {Text} - имя пользователя.
 * @param info.cohort {Text} - номер когорты.
 * @param name {Object} - элемент на странице содержащий имя.
 * @param about {Object} - элемент на странице содержащий род деятельности.
 * @param avatar {Object} - элемент на странице содержащий аватар.
 */
export function associatePersonalInfo(info, name, about, avatar) {
  name.textContent = info.name;
  about.textContent = info.about;
  avatar.src = info.avatar;
  avatar.alt = info.name;
}

/**
 * Выполняет непосредственно запрос на сервер на удаление, удаление карточки и управление слушателем и попапом при удачном ответе.
 * @param evt {Object} - объект эвента.
 */
function handlerDeletingCard(evt) {
  const deleteBtn = document.querySelector("#deleteCardSubmitPopup");

  evt.preventDefault();

  showLoadingOnBtn("loading", deleteBtn);

  deleteCard(cardId)
    .then(res => {
      cardElement.remove();
      removeClassToClosePopup(deleteCardPopupElement);
      removeEventListener("submit", handlerDeletingCard);
    })
    .catch(alertError)
    .finally(() => {
      showLoadingOnBtn("done", deleteBtn);
    });
}

/**
 * Функция отвечающая за срабатывание удаления конкретной карточки.
 * @param card {Object} - удаляемая карточка.
 */
export function handlerSubmitDeleteCard(card) {
  const deleteCardForm = deleteCardPopupElement.querySelector(".popup__form");
  cardId = card.dataset.id;
  cardElement = card;
  deleteCardForm.addEventListener("submit", handlerDeletingCard);
}

/**
 * Позволяет отправить запрос при изменении аватара и меняет его на странице при успешном ответе.
 * @param popup {Object} - попап в котором меняем аватар.
 * @param imageElement {Object} - элемент содержащий аватар на странице.
 */
export function handlerEditingAvatar(popup, imageElement) {
  const form = popup.querySelector("form");
  const input = form.querySelector(".popup__input");
  const submitBtn = form.querySelector(".popup__submit-btn");

  form.addEventListener("submit", evt => {
    evt.preventDefault();

    showLoadingOnBtn("loading", submitBtn);
    updateAvatar(input.value)
      .then(res => {
        imageElement.src = res.avatar;
        removeClassToClosePopup(popup);
      })
      .catch(alertError)
      .finally(() => {
        showLoadingOnBtn("done", submitBtn);
      });
  });
}

/**
 * Меняет текст кнопки для отображения загрузки.
 * @param status {string} - статус загрузки. Так же может быть loading и done.
 * @param btn {Object} - кнопка, текст которой меняем.
 */
export function showLoadingOnBtn(status, btn) {
  switch (status) {
    case "default":
      btn.textContent = "Сохранить";
      break;
    case "loading":
      btn.textContent = "Сохранение";
      break;
    case "done":
      btn.textContent = "Сохранено";
      break;
  }
}

/**
 * Проверяет ответ фетча на успешность.
 * @param res {Promise} - промис с ответом.
 * @returns {Promise<never>|*} - промис с ответом.
 */
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка при выполнении запроса: ${res.status}`);
}

/**
 * Для вывода ошибки в консоль.
 * @param err {Object} - ошибка.
 */
export function alertError(err) {
  console.error(err);
}
