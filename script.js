// ----------- Popups ------------- // 

// profile
const popupProfile = document.querySelector(".popup_type_profile");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close-button_type_profile");

// open edit profile
profileEditButton.addEventListener("click", () => {
  popupProfile.classList.add("popup_opened");
});

// close edit profile
profileCloseButton.addEventListener("click", () => {
  popupProfile.classList.remove("popup_opened");
});

// add-card
const popupCard = document.querySelector(".popup_type_card");
const popupCardAddButton = document.querySelector(".profile__add-button");
const popupCardCloseButton = document.querySelector(".popup__close-button_type_card-form");

// open add-card
popupCardAddButton.addEventListener("click", () => {
  popupCard.classList.add("popup_opened")
});

// close add-card
popupCardCloseButton.addEventListener("click", () => {
  popupCard.classList.remove("popup_opened");
});


// ------------- Forms ------------- // 

// profile
const profileFormElement = document.querySelector(".popup__form_type_profile");
const nameInput = document.querySelector(".popup__item_el_name");
const jobInput = document.querySelector(".popup__item_el_description");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popupProfile.classList.remove("popup_opened");
}

profileFormElement.addEventListener("submit", profileFormSubmitHandler);

// add-card
const cardFormElement = document.querySelector(".popup__form_type_card");
const placeNameInput = document.querySelector(".popup__item_el_place");
const imageLinkInput = document.querySelector(".popup__item_el_link");

const placeName = document.querySelector(".popup__item_el_place");
const imageLink = document.querySelector(".popup__item_el_link");

function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  // add card only if both inputs are filled
  if (!!placeName.value && !!imageLink.value) {
    addCard(placeName.value, imageLink.value);
    popupCard.classList.remove("popup_opened");
    // remove input values after adding the card
    placeName.value = "";
    imageLink.value = "";
  } else {
    // alert in case some of the inputs wasn't filled
    alert("Чтобы добавить карточку, укажите название места и ссылку на изображение.");
  }
}

cardFormElement.addEventListener("submit", cardFormSubmitHandler);


// ---------- Cards ------------ // 

const cardsContainer = document.querySelector(".places__grid");

// function for adding a new card
function addCard(placeName, imageLink) {

  const cardTemplate = document.querySelector(".card__template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  
  card.querySelector(".card__title").textContent = placeName;
  card.querySelector(".card__image").src = imageLink;
  card.querySelector(".image-popup__title").textContent = placeName;
  card.querySelector(".image-popup__image").src = imageLink;
  
  // like button
  card.querySelector(".card__like-button").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_active");
  });

  // delete button
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });

  // open preview by clicking on image
  const cardImage = card.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    const imagePopup = cardImage.closest(".card").querySelector(".image-popup")
    imagePopup.classList.add("image-popup_opened");
  });

  // close preview button
  const imagePopupCloseButton = card.querySelector(".image-popup__close-button");
  imagePopupCloseButton.addEventListener("click", () => {
    imagePopupCloseButton.closest(".image-popup").classList.remove("image-popup_opened");
  });

  cardsContainer.prepend(card);
}

// initial set of cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

// load the initial set of cards
initialCards.forEach(item => {
  addCard(item.name, item.link);
});