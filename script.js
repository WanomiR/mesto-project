let page = document.querySelector(".page");

// open edit profile popup
let profileEditButton = page.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => {
  page.querySelector(".popup").classList.add("popup_opened")
});

// close edit profile popup
let profileEditCloseButton = page.querySelector(".popup__close-button");
profileEditCloseButton.addEventListener("click", () => {
  page.querySelector(".popup").classList.remove("popup_opened");
});