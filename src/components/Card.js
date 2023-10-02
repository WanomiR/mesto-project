import {
  addingClassToOpenPopup
} from "./modal";
import {alertError, handlerSubmitDeleteCard, showLoadingOnBtn} from "./utils";
import {deleteLikeOnCard, putLikeOnCard} from "./api";

/*Попап для просмотра изображения и его элементы*/
export const viewImagePopupElement = document.querySelector("#imageViewerPopup");
const imagePopupElement = viewImagePopupElement.querySelector(".popup__image");
const descriptionPopupElement = viewImagePopupElement.querySelector(".popup__image-description");
export const deleteCardPopupElement = document.querySelector("#confirmDeleteCard");
const submitDeletingCardBtn = deleteCardPopupElement.querySelector(".popup__submit-btn");

/**
 * Функция для возможности ставить лайк карточке.
 * @param card {Element} - элемент карточки, на которую надо добавить событие.
 */
function addEventToLikeCard(card) {
  const likeBtn = card.querySelector(".card__like-btn");
  const likeCounter = card.querySelector(".card__like-counter");

  likeBtn.addEventListener("click", () => {
    if (likeBtn.classList.contains("card__like-btn_active")) {
      deleteLikeOnCard(card.dataset.id)
        .then(res => {
          likeCounter.textContent = res.likes.length;
          likeBtn.classList.toggle("card__like-btn_active");
        })
        .catch(alertError);
    } else {
      putLikeOnCard(card.dataset.id)
        .then(res => {
          likeCounter.textContent = res.likes.length;
          likeBtn.classList.toggle("card__like-btn_active");
        })
        .catch(alertError);
    }
  });
}

/**
 * Функция позволяет удалить карточку из галереи
 * @param card {Element} - элемент карточки, на которую надо добавить событие.
 */
function addEventToDeleteCard(card) {
  const deleteBtn = card.querySelector(".card__delete-btn");

  deleteBtn.addEventListener("click", evt => {
    addingClassToOpenPopup(deleteCardPopupElement);
    handlerSubmitDeleteCard(evt.target.offsetParent);
    showLoadingOnBtn("default", submitDeletingCardBtn);
  });
}

/**
 * Функция позволяет повесить событие открытия попапа с картинкой на карточку.
 * @param card {Element} - элемент карточки, на которую надо добавить событие.
 */
function addEventToOpenImagePopup(card) {
  const imageCardElement = card.querySelector(".card__image");
  const descriptionCardElement = card.querySelector(".card__description");

  imageCardElement.addEventListener("click", () => {
    imagePopupElement.src = imageCardElement.src;
    imagePopupElement.alt = imageCardElement.alt;
    descriptionPopupElement.textContent = descriptionCardElement.textContent;
  });

  imageCardElement.addEventListener("click", () => {
    addingClassToOpenPopup(viewImagePopupElement);
  });
}

/**
 * Функция для отрисовки карточки в галерее.
 * @param card {Object} - Объект с данными о карточке.
 * @param id {String} - Id пользователя.
 * @param card.link {String} - Поле со ссылкой на изображение.
 * @param card.name {String} - Поле с описанием места.
 * @param card.likes {Array} - Поле хранит массив лайков с информацией о том, кому понравилось.
 */
function createCardElement(card, id) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  const descriptionCardElement = cardElement.querySelector(".card__description");
  const countOfLikes = cardElement.querySelector(".card__like-counter");
  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  const isLikedByMe = card.likes.some(like => {
    return like._id === id;
  });
  const likeBtn = cardElement.querySelector(".card__like-btn");

  imageCardElement.src = card.link;
  imageCardElement.alt = card.name;
  descriptionCardElement.textContent = card.name;
  countOfLikes.textContent = card.likes.length;
  cardElement.setAttribute("data-id", card._id);

  if (card.owner._id !== id) {
    deleteBtn.remove();
  } else {
    addEventToDeleteCard(cardElement);
  }

  if (isLikedByMe) {
    likeBtn.classList.add("card__like-btn_active");
  }

  addEventToLikeCard(cardElement);
  addEventToOpenImagePopup(cardElement);

  return cardElement;
}

/**
 * Функция, выполняющая рендер галереи.
 * @param data {Array} - массив с данными для карточек в галерее.
 * @param data.createdAt {Data} - дата создания карточки.
 * @param data.likes {Array} - массив лайков с информацией о том, кому понравилось.
 * @param data.link {URL} - URL картинки места.
 * @param data.name {Text} - название места.
 * @param data.owner {Object} - владелец карточки.
 * @param galleryElement {Object} - элемент галереи, в котором требуется выполнить рендер карточек.
 * @param id {String} - ID пользователя.
 * */
export function renderGallery(data, galleryElement, id) {
  if (data.length > 0) {
    data.forEach(card => {
      galleryElement.append(createCardElement(card, id));
    });
  }
}

/**
 * Функция для срабатывания создания карточки по нажатию на кнопку добавления новой карточки.
 */
export function addNewCard(card, galleryElement, id) {
    const newCardElement = createCardElement(card, id);

  galleryElement.prepend(newCardElement);
}
