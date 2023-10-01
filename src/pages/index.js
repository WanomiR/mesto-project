// ---------- Imports ---------- //

import "./index.css";
import {
    apiConfig,
    cardSelectors,
    formSelectors,
    userSelectors,
    buttonAddCard,
    buttonEditProfile,
    buttonEditAvatar,
    cardsGrid,
    profileForm,
    userName,
    userDescription
} from "../components/constants"
import Api from "../components/Api";
import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";
import {generateCard} from "../components/utils";


// ---------- Classes initialization ---------- //

const api = new Api(apiConfig)
const profile = new UserInfo(userSelectors)
const popupImage = new PopupWithImage(".popup_type_image");

const popupCard = new PopupWithForm(".popup_type_card", (data) => {
    // submit form callback
    popupCard.renderLoading(true)
    api.postCard(data)
        .then(cardContent => {
            popupCard.close()
            const cardElement = generateCard({
                Card, cardContent, cardSelectors, api, popupImage, userId: sessionStorage.getItem("id")
            })
            cardsGrid.prepend(cardElement);
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupCard.renderLoading(false)
        })

});

const popupProfile = new PopupWithForm(".popup_type_profile", (data) => {
    popupProfile.renderLoading(true);
    api.patchUserInfo(data)
        .then(res => profile.setUserInfo(res.name, res.about))
        .catch(err => console.log(err))
        .finally(() => {
            popupProfile.renderLoading(false);
            popupProfile.close();
        });
});

const popupAvatar = new PopupWithForm(".popup_type_avatar", ({avatarLink}) => {
    popupAvatar.renderLoading(true);
    api.patchUserAvatar(avatarLink)
        .then(res => profile.setUserAvatar(res.avatar))
        .catch(err => console.log(err))
        .finally(() => {
            popupAvatar.renderLoading(false);
            popupAvatar.close();
        });
});


// ---------- Event listeners ---------- //

popupImage.setEventListeners();
popupCard.setEventListeners()
popupProfile.setEventListeners()
popupAvatar.setEventListeners();

buttonAddCard.addEventListener("click", () => {
    popupCard.open();
});
buttonEditAvatar.addEventListener("click", () => {
    popupAvatar.open();
})
buttonEditProfile.addEventListener("click", () => {
    const {name, about} = profile.getUserInfo();
    const validator = new FormValidator(formSelectors, profileForm)
    userName.value = name;
    userDescription.value = about;
    validator.enableValidation();
    popupProfile.open();
})


// ---------- Enable validation ---------- //

Array.from(document.forms).forEach(formElement => {
    const validator = new FormValidator(formSelectors, formElement);
    validator.enableValidation();
})


// ---------- Load user info and render cards ---------- //

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(res => {
        const [userData, cards] = res;
        profile.loadProfileData(userData) // load profile data
        sessionStorage.setItem("id", userData._id)  // save user id
        const cardList = new Section({ // render cards
            data: cards, renderer: (cardContent) => {
                const cardElement = generateCard({
                    Card, cardContent, cardSelectors, api, popupImage, userId: sessionStorage.getItem("id")
                })
                cardList.addItem(cardElement);
            }
        }, '.places__grid')
        cardList.renderItems();
    })
    .catch(err => console.log(err))

