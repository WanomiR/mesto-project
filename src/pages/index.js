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
import PopupConfirmDelete from "../components/PopupConfirmDelete";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";


// create class instances
const api = new Api(apiConfig)
const profile = new UserInfo(userSelectors, api)
const popupImage = new PopupWithImage(".popup_type_image");

const popupConfirmDelete = new PopupConfirmDelete(".popup_type_confirm-delete", (buttonElement, cardId) => {
    api.deleteCard(cardId)
        .then(res => {
            console.log(res.message);
            buttonElement.closest(cardSelectors.cardElement).remove();
        })
        .catch(err => console.log(err))
    popupConfirmDelete.close();
});

const popupCard = new PopupWithForm(".popup_type_card", async (data) => {
    // submit form callback
    const userData = await profile.getUserInfo();
    popupCard.renderLoading(true)
    api.postCard(data)
        .then(cardContent => {
            popupCard.close()
            const card = new Card({
                cardContent, cardSelectors, api, popupImage, popupConfirmDelete, userId: userData._id
            })
            const cardElement = card.generate()
            cardsGrid.prepend(cardElement);
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupCard.renderLoading(false)
        })

});

const popupProfile = new PopupWithForm(".popup_type_profile", (data) => {
    profile.setUserInfo(data, popupProfile);
});

const popupAvatar = new PopupWithForm(".popup_type_avatar", ({avatarLink}) => {
    profile.setUserAvatar(avatarLink, popupAvatar);
});


// load profile data
profile.loadProfileData();


// set event listeners
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
buttonEditProfile.addEventListener("click", async () => {
    const {name, about} = await profile.getUserInfo();
    const validator = new FormValidator(formSelectors, profileForm)
    userName.value = name;
    userDescription.value = about;
    validator.enableValidation();
    popupProfile.open();
})


// enable validation
Array.from(document.forms).forEach(formElement => {
    const validator = new FormValidator(formSelectors, formElement);
    validator.enableValidation();
})


// render cards
Promise.all([profile.getUserInfo(), api.getInitialCards()])
    .then(res => {
        const [userData, cards] = res;
        const cardList = new Section({data: cards, renderer: (cardContent) => {
                const card = new Card({
                    cardContent, cardSelectors, api, popupImage, popupConfirmDelete, userId: userData._id
                });
                const cardElement = card.generate();
                cardList.addItem(cardElement);
            }}, '.places__grid')
        cardList.renderItems();
    })
    .catch(err => console.log(err))
