(()=>{"use strict";const e={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},t={templateSelector:".card__template",cardElement:".card",title:".card__title",image:".card__image",likeButton:".card__like-button",likeButtonActive:"card__like-button_active",likesCounter:".card__like-counter",likesCounterActive:"card__like-counter_active",deleteButton:".card__delete-button",deleteButtonActive:"card__delete-button_active"},s=document.querySelector(".profile__add-button"),r=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__edit-avatar-button"),i=document.forms.userInfo,{userName:o,userDescription:a}=i.elements;class l{constructor({data:e,renderer:t},s){this._itemsToRender=e,this._renderer=t,this._container=document.querySelector(s)}appendItem(e){this._container.append(e)}prependItem(e){this._container.prepend(e)}clear(){this._container.innerHTML=""}renderItems(){this._itemsToRender.forEach((e=>{this._renderer(e)}))}}class c{constructor({cardContent:e,cardSelectors:t,handleOpenPopup:s,handleDeleteCard:r,putLike:n,removeLike:i,userId:o}){this._content=e,this._selectors=t,this._handleDeleteCard=r,this._handleOpenPopup=s,this._putLike=n,this._removeLike=i,this._userId=o}generate(){this._cardElement=this._getElement();const e=this._cardElement.querySelector(this._selectors.title);return this._cardImage=this._cardElement.querySelector(this._selectors.image),this._likeButton=this._cardElement.querySelector(this._selectors.likeButton),this._likesCounter=this._cardElement.querySelector(this._selectors.likesCounter),this._deleteButton=this._cardElement.querySelector(this._selectors.deleteButton),e.textContent=this._content.name,this._cardImage.src=this._content.link,this._cardImage.alt=`Фото: ${this._content.name}`,this.updateLikeButton(this._content.likes),this._updateDeleteButton(),this._setEventListeners(),this._cardElement}updateLikeButton(e){this._content.likes!==e&&(this._content.likes=e),this._hasUserLike()?this._likeButton.classList.add(this._selectors.likeButtonActive):this._likeButton.classList.remove(this._selectors.likeButtonActive),this._updateLikesCounter()}deleteCard(){this._cardElement.remove()}_getElement(){return document.querySelector(this._selectors.templateSelector).content.querySelector(this._selectors.cardElement).cloneNode(!0)}_setEventListeners(){this._likeButton.addEventListener("click",(e=>{this._handleLikeButton(e)})),this._deleteButton.addEventListener("click",(()=>{this._handleDeleteCard(this._cardElement,this._content._id)})),this._cardImage.addEventListener("click",(()=>{this._handleOpenPopup(this._content.name,this._content.link)}))}_handleLikeButton(){this._hasUserLike()?this._removeLike(this._content._id):this._putLike(this._content._id)}_isCardOwner(){return this._content.owner._id===this._userId}_hasUserLike(){return this._content.likes.some((e=>e._id===this._userId))}_updateLikesCounter(){this._content.likes.length>0?this._likesCounter.classList.add(this._selectors.likesCounterActive):this._likesCounter.classList.remove(this._selectors.likesCounterActive),this._likesCounter.textContent=this._content.likes.length}_updateDeleteButton(){this._isCardOwner()&&this._deleteButton.classList.add(this._selectors.deleteButtonActive)}}class h{_popupElement;constructor(e){this._popupElement=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}_handleEscClose(e){"Escape"===e.key&&this.close()}open(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keyup",this._handleEscClose)}close(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keyup",this._handleEscClose)}setEventListeners(){this._popupElement.addEventListener("click",(e=>{(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-button"))&&this.close()}))}}class d extends h{_formElement;_submitButton;_inputsList;_handlerSubmitForm;constructor({selectorPopup:e,formSubmitCallback:t,clearFieldsHandler:s}){super(e),this._formElement=this._popupElement.querySelector(".form"),this._submitButton=this._popupElement.querySelector(".form__submit-button"),this._inputsList=this._formElement.querySelectorAll(".form__input"),this._handlerSubmitForm=t,this._clearFieldsHandler=s}_getInputValues(){const e={};return this._inputsList.forEach((t=>e[t.name]=t.value)),e}close(){super.close(),setTimeout((()=>{this._formElement.reset(),this._clearFieldsHandler()}),500)}setEventListeners(){super.setEventListeners(),this._formElement.addEventListener("submit",(e=>{e.preventDefault(),this._handlerSubmitForm(this._getInputValues())}))}renderLoading(e){this._submitButton.textContent=e?"Сохранение...":"Сохранить"}}class _{constructor(e,t){this._selectors=e,this._form=t,this._inputList=Array.from(this._form.querySelectorAll(this._selectors.inputSelector)),this._buttonElement=this._form.querySelector(this._selectors.submitButtonSelector)}_showInputError(e,t){const s=this._form.querySelector(`.${e.id}-error`);e.classList.add(this._selectors.inputErrorClass),s.textContent=t,s.classList.add(this._selectors.errorClass)}_hideInputError(e){const t=this._form.querySelector(`.${e.id}-error`);e.classList.remove(this._selectors.inputErrorClass),t.classList.remove(this._selectors.errorClass),t.textContent=""}_checkInputValidity(e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_disableButton(){this._buttonElement.classList.add(this._selectors.inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)}_enableButton(){this._buttonElement.classList.remove(this._selectors.inactiveButtonClass),this._buttonElement.removeAttribute("disabled")}_toggleButtonState(){this._hasInvalidInput()?this._disableButton():this._enableButton()}enableValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e),e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}clearInputErrors(){this._inputList.forEach((e=>{this._hideInputError(e)})),this._toggleButtonState()}}const u={};let p;Array.from(document.forms).forEach((t=>{u[t.name]=new _(e,t),u[t.name].enableValidation()}));const m=new class{constructor({baseUrl:e,headers:t}){this._baseUrl=e,this._headers=t}_handleResponse(e){return e.ok?e.json():Promise.reject(`Error: ${e.status}`)}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then((e=>this._handleResponse(e)))}getUserInfo(){return fetch(`${this._baseUrl}/users/me`,{method:"GET",headers:this._headers}).then((e=>this._handleResponse(e)))}patchUserInfo({userName:e,userDescription:t}){return fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((e=>this._handleResponse(e)))}patchUserAvatar(e){return fetch(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>this._handleResponse(e)))}postCard({placeName:e,imageLink:t}){return fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((e=>this._handleResponse(e)))}deleteCard(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>this._handleResponse(e)))}putLike(e){return fetch(`${this._baseUrl}/cards/likes/${e}`,{method:"PUT",headers:this._headers}).then((e=>this._handleResponse(e)))}deleteLike(e){return fetch(`${this._baseUrl}/cards/likes/${e}`,{method:"DELETE",headers:this._headers}).then((e=>this._handleResponse(e)))}}({baseUrl:"https://nomoreparties.co/v1/plus-cohort-28",headers:{authorization:"ae8892c5-a1e1-40d3-aba9-31eb2dd98185","Content-Type":"application/json"}}),E=new class{constructor({nameSelector:e,aboutSelector:t,avatarSelector:s}){this._nameElement=document.querySelector(e),this._aboutElement=document.querySelector(t),this._avatarElement=document.querySelector(s)}loadProfileData({name:e,about:t,avatar:s}){this._nameElement.textContent=e,this._aboutElement.textContent=t,this._avatarElement.src=s,this._avatarElement.alt=e}getUserInfo(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent}}setUserInfo(e,t){this._nameElement.textContent=e,this._aboutElement.textContent=t,this._avatarElement.alt=e}setUserAvatar(e){this._avatarElement.src=e}}({nameSelector:".profile__title",aboutSelector:".profile__subtitle",avatarSelector:".profile__avatar"}),v=new class extends h{_imageElement;_descriptionElement;constructor(e){super(e),this._imageElement=this._popupElement.querySelector(".popup__image"),this._descriptionElement=this._popupElement.querySelector(".popup__title_image")}open(e,t){new Promise(((s,r)=>{this._descriptionElement.textContent=e,this._imageElement.src=t,this._imageElement.alt=`Фото: ${e}`,this._imageElement.onload=s,this._imageElement.onerror=r})).then((()=>super.open())).catch((e=>console.log(`Error opening popup image: ${e}`)))}}(".popup_type_image"),b=new class extends h{constructor({selectorPopup:e,formSubmitCallback:t}){super(e),this._formElement=this._popupElement.querySelector(".form"),this._hanldeSubmitForm=t}setEventListeners(e,t,s){super.setEventListeners(),this._formElement.addEventListener("submit",(r=>{r.preventDefault(),this._hanldeSubmitForm(e,t,s)}))}}({selectorPopup:".popup_type_confirm-delete",formSubmitCallback:(e,t,s)=>{m.deleteCard(t).then((e=>{s.deleteCard(),console.log(e.message),b.close()})).catch((e=>console.log(e)))}});function L({Card:e,cardContent:t,cardSelectors:s,popupImage:r,userId:n}){const i=new e({cardContent:t,cardSelectors:s,api:m,userId:n,handleOpenPopup:(e,t)=>{r.open(e,t)},handleDeleteCard:(e,t)=>{b.setEventListeners(e,t,i),b.open()},putLike:e=>{m.putLike(e).then((e=>i.updateLikeButton(e.likes))).catch((e=>console.log(e)))},removeLike:e=>{m.deleteLike(e).then((e=>i.updateLikeButton(e.likes))).catch((e=>console.log(e)))}});return i.generate()}const k=new d({selectorPopup:".popup_type_card",formSubmitCallback:e=>{k.renderLoading(!0),m.postCard(e).then((e=>{const s=L({Card:c,cardContent:e,cardSelectors:t,api:m,popupImage:v,userId:sessionStorage.getItem("id")});p.prependItem(s),k.close()})).catch((e=>console.log(e))).finally((()=>{k.renderLoading(!1)}))},clearFieldsHandler:()=>{u.card.clearInputErrors()}}),f=new d({selectorPopup:".popup_type_profile",formSubmitCallback:e=>{f.renderLoading(!0),m.patchUserInfo(e).then((e=>{E.setUserInfo(e.name,e.about),f.close()})).catch((e=>console.log(e))).finally((()=>{f.renderLoading(!1)}))},clearFieldsHandler:()=>{u.userInfo.clearInputErrors()}}),g=new d({selectorPopup:".popup_type_avatar",formSubmitCallback:({avatarLink:e})=>{g.renderLoading(!0),m.patchUserAvatar(e).then((e=>{E.setUserAvatar(e.avatar),g.close()})).catch((e=>console.log(e))).finally((()=>{g.renderLoading(!1)}))},clearFieldsHandler:()=>{u.profileAvatar.clearInputErrors()}});v.setEventListeners(),k.setEventListeners(),f.setEventListeners(),g.setEventListeners(),s.addEventListener("click",(()=>{k.open()})),n.addEventListener("click",(()=>{g.open()})),r.addEventListener("click",(()=>{const{name:e,about:t}=E.getUserInfo();o.value=e,a.value=t,f.open()})),Promise.all([m.getUserInfo(),m.getInitialCards()]).then((e=>{const[s,r]=e;E.loadProfileData(s),sessionStorage.setItem("id",s._id),p=new l({data:r,renderer:e=>{const s=L({Card:c,cardContent:e,cardSelectors:t,api:m,popupImage:v,userId:sessionStorage.getItem("id")});p.appendItem(s)}},".places__grid"),p.clear(),p.renderItems()})).catch((e=>console.log(e)))})();