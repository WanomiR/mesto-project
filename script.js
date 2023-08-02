// ----------------------------- // 

// -------- Form --------------- // 
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__item_el_name");
const jobInput = document.querySelector(".popup__item_el_description");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");

function formSubmitHandler(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);


// ---------- Cards ------------ // 
const cardsContainer = document.querySelector(".places__grid");

function addCard(placeName, imageLink) {
  const cardTemplate = document.querySelector(".card__template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  card.querySelector(".card__title").textContent = placeName;
  card.querySelector(".card__image").src = imageLink;

  card.querySelector(".card__like-button").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_active");
  });

  cardsContainer.appendChild(card);
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
  console.log(item.name);
  addCard(item.name, item.link);
});

// ---------- Profile ---------- // 

// open edit profile popup
const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => {
  document.querySelector(".popup").classList.add("popup_opened")
});

// close edit profile popup
const profileEditCloseButton = document.querySelector(".popup__close-button");
profileEditCloseButton.addEventListener("click", () => {
  document.querySelector(".popup").classList.remove("popup_opened");
});


