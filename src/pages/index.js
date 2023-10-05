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
    userName,
    userDescription
} from "../components/constants"
import Api from "../components/Api";
import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import PopupConfirm from "../components/PopupConfirm";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";




// ---------- Variables ---------- //

const validators = {}
let cardList;

// ---------- Enable validation ---------- //

Array.from(document.forms).forEach(formElement => {
    validators[formElement.name] = new FormValidator(formSelectors, formElement);
    validators[formElement.name].enableValidation();
})


// ---------- Classes initialization ---------- //

const api = new Api(apiConfig)
const profile = new UserInfo(userSelectors)
const popupImage = new PopupWithImage(".popup_type_image");

const popupConfirmDelete = new PopupConfirm({
    selectorPopup: ".popup_type_confirm-delete",
    formSubmitCallback: (cardElement, cardId, card) => {
        api.deleteCard(cardId)
            .then(res => {
                card.deleteCard();
                console.log(res.message);
                popupConfirmDelete.close()
            })
            .catch(err => console.log(err));
    }
})

function generateCard({Card, cardContent, cardSelectors, popupImage, userId}) {
    const card = new Card({
        cardContent, cardSelectors, api, userId,
        handleOpenPopup: (placeName, imageLink) => {
            popupImage.open(placeName, imageLink);
        },
        handleDeleteCard: (cardElement, cardId) => {
            popupConfirmDelete.setEventListeners(cardElement, cardId, card);
            popupConfirmDelete.open()
        },
        putLike: (cardId) => {
            api.putLike(cardId)
                .then(res => card.updateLikeButton(res.likes))
                .catch(err => console.log(err));
        },
        removeLike: (cardId) => {
            api.deleteLike(cardId)
                .then(res => card.updateLikeButton(res.likes))
                .catch(err => console.log(err));
        }
    })
    return card.generate();
}

const popupCard = new PopupWithForm({
    selectorPopup: ".popup_type_card",
    formSubmitCallback: (data) => {
        // submit form callback
        popupCard.renderLoading(true)
        api.postCard(data)
            .then(cardContent => {
                const cardElement = generateCard({
                    Card, cardContent, cardSelectors, api, popupImage, userId: sessionStorage.getItem("id")
                });
                cardList.prependItem(cardElement);
                popupCard.close()
            })
            .catch(err => console.log(err))
            .finally(() => {
                popupCard.renderLoading(false)
            })
    },
    clearFieldsHandler: () => {
        validators.card.clearInputErrors();
    }
});

const popupProfile = new PopupWithForm({
    selectorPopup: ".popup_type_profile",
    formSubmitCallback: (data) => {
        popupProfile.renderLoading(true);
        api.patchUserInfo(data)
            .then(res => {
                profile.setUserInfo(res.name, res.about)
                popupProfile.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                popupProfile.renderLoading(false);
            });
    },
    clearFieldsHandler: () => {
        validators.userInfo.clearInputErrors();
    }
});

const popupAvatar = new PopupWithForm({
    selectorPopup: ".popup_type_avatar",
    formSubmitCallback: ({avatarLink}) => {
        popupAvatar.renderLoading(true);
        api.patchUserAvatar(avatarLink)
            .then(res => {
                profile.setUserAvatar(res.avatar)
                popupAvatar.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                popupAvatar.renderLoading(false);
            });
    },
    clearFieldsHandler: () => {
        validators.profileAvatar.clearInputErrors();
    }
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
    userName.value = name;
    userDescription.value = about;
    popupProfile.open();
})


// ---------- Load user info and render cards ---------- //

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(res => {
        const [userData, cards] = res;
        profile.loadProfileData(userData) // load profile data
        sessionStorage.setItem("id", userData._id)  // save current user id
        cardList = new Section({ // render cards
            data: cards, renderer: (cardContent) => {
                const cardElement = generateCard({
                    Card, cardContent, cardSelectors, api, popupImage, userId: sessionStorage.getItem("id")
                })
                cardList.appendItem(cardElement);
            }
        }, '.places__grid')
        cardList.clear();
        cardList.renderItems();
    })
    .catch(err => console.log(err))