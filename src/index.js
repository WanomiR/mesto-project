// ---------- Imports ------------ //



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
const profileFormElement = document.querySelector(".form_type_profile");
const nameInput = document.querySelector(".form__input_el_name");
const jobInput = document.querySelector(".form__input_el_description");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

// add-card form variables
const cardFormElement = document.querySelector(".form_type_card");

const placeName = document.querySelector(".form__input_el_place");
const imageLink = document.querySelector(".form__input_el_link");

// card and image popup variables
const cardTemplate = document.querySelector(".card__template").content;

const cardsContainer = document.querySelector(".places__grid");
const popupTitleImage = document.querySelector(".popup__title_image");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");

// close image preview button
const imagePopupCloseButton = document.querySelector(".popup__close-button_type_image");


// ---------- Functions ---------- //

// function for opening popups
function openPopup(element) {
  element.classList.add("popup_opened");
}

// function for closing popups
function closePopup(element) {
  element.classList.remove("popup_opened");
}

// functions for submitting forms
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
}

function submitFormCard(evt) {
  evt.preventDefault();

  const item = {
    name: placeName.value,
    link: imageLink.value,
  }
  cardsContainer.prepend(createCard(item));
  closePopup(popupCard);

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
    openPopup(popupTypeImage);
  });

  return cardElement;
}


// ---------- Listeners ---------- //

// open profile popup
profileEditButton.addEventListener("click", () => {
  openPopup(popupProfile)
});

// close profile popup
profileCloseButton.addEventListener("click", () => {
  closePopup(popupProfile)
});

// open add-card popup
popupCardAddButton.addEventListener("click", () => {
  openPopup(popupCard);
});

// close add-card popup
popupCardCloseButton.addEventListener("click", () => {
  closePopup(popupCard);
});

// close image popup 
imagePopupCloseButton.addEventListener("click", () => {
  closePopup(popupTypeImage);
});

// submit form
cardFormElement.addEventListener("submit", submitFormCard);
profileFormElement.addEventListener("submit", submitFormProfile);


// place for enableValidation()
const popupElement = document.querySelector(".popup_type_profile")

popupElement.addEventListener("click", (evt) => {
  evt.target.classList.remove("popup_opened")
});


// ---------- Initial set of cards ---------- //

// load the initial set of cards
initialCards.forEach(item => {
  cardsContainer.prepend(createCard(item));
});



// ---------- Forms validation ------------- //
// const formElement = document.forms.userInfo


