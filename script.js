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

// like button
const likeButton = document.querySelector(".card__like-button");
likeButton.addEventListener("click", () => {
  likeButton.classList.toggle("card__like-button_active");
}); // works only for the first card :(