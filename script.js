// ---------- Variables ---------- //

// profile element variables
const popupProfile = document.querySelector(".popup_type_profile");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close-button_type_profile");

// add-card element variables
const popupCard = document.querySelector(".popup_type_card");
const popupCardAddButton = document.querySelector(".profile__add-button");
const popupCardCloseButton = document.querySelector(".popup__close-button_type_card-form");

// profile form variables
const profileFormElement = document.querySelector(".popup__form_type_profile");
const nameInput = document.querySelector(".popup__item_el_name");
const jobInput = document.querySelector(".popup__item_el_description");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

// add-card form variables
const cardFormElement = document.querySelector(".popup__form_type_card");
const placeNameInput = document.querySelector(".popup__item_el_place");
const imageLinkInput = document.querySelector(".popup__item_el_link");

const placeName = document.querySelector(".popup__item_el_place");
const imageLink = document.querySelector(".popup__item_el_link");

// card and image popup variables
const cardTemplate = document.querySelector(".card__template").content;

const cardsContainer = document.querySelector(".places__grid");
const popupTitleImage = document.querySelector(".popup__title_image");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");

// close image preview button
const imagePopupCloseButton = document.querySelector(".popup__close-button_type_image");


// ---------- Functions ---------- //

// function for opening and closing popups
function togglePopup(element) {
  element.classList.toggle("popup_opened");
}

// functions for submitting forms
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupProfile.classList.remove("popup_opened");
}

function submitFormCard(evt) {
  evt.preventDefault();

  const item = {
    name: placeName.value,
    link: imageLink.value,
  }
  cardsContainer.prepend(createCard(item));
  togglePopup(popupCard);

  // clear the input values
  placeName.value = "";
  imageLink.value = "";
}

// function for creating new cards
function createCard(item) {
  
  const placeName = item.name;
  const imageLink = item.link;
  let imageAltText = "";

  if (!!item.alt) {
    imageAltText = item.alt;
  }

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  
  cardTitle.textContent = placeName;
  cardImage.src = imageLink;
  cardImage.alt = imageAltText;
  
  // like button
  cardElement.querySelector(".card__like-button").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_active");
  });
  
  // delete button
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });
  
  // open preview button
  cardImage.addEventListener("click", () => {
    popupTitleImage.textContent = placeName;
    popupImage.src = imageLink;
    popupImage.alt = imageAltText;
    togglePopup(popupTypeImage);
  });

  return cardElement;
}


// ---------- Listeners ---------- //

// open profile popup
profileEditButton.addEventListener("click", () => {
  togglePopup(popupProfile)
});

// close profile popup
profileCloseButton.addEventListener("click", () => {
  togglePopup(popupProfile)
});

// open add-card popup
popupCardAddButton.addEventListener("click", () => {
  togglePopup(popupCard);
});

// close add-card popup
popupCardCloseButton.addEventListener("click", () => {
  togglePopup(popupCard);
});

// close image popup 
imagePopupCloseButton.addEventListener("click", () => {
  togglePopup(popupTypeImage);
  popupTitleImage.textContent = "";
  popupImage.src = "";
});

// submit form
cardFormElement.addEventListener("submit", submitFormCard);
profileFormElement.addEventListener("submit", submitFormProfile);


// ---------- Initial set of cards ---------- //

// initial set of cards
const initialCards = [
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

// load the initial set of cards
initialCards.forEach(item => {
  cardsContainer.prepend(createCard(item));
});