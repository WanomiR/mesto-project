import Popup from "./Popup";

/**
 * Обработка попапа для просмотра изображений.
 */
export default class PopupWithImage extends Popup{
    _imageElement;
    _descriptionElement;

    /**
     * Создать попап.
     * @param popupSelector {String} - селектор попапа.
     */
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement.querySelector(".popup__image");
        this._descriptionElement = this._popupElement.querySelector(".popup__title_image");
    }

    /**
     * Прокинуть значения в попап и открыть его.
     * @param placeName {String} - название места.
     * @param imageLink {String} - ссылка на изображение места.
     */
    open(placeName, imageLink) {
        new Promise((resolve, reject) => {
            this._descriptionElement.textContent = placeName;
            this._imageElement.src = imageLink;
            this._imageElement.alt = `Фото: ${placeName}`;
            this._imageElement.onload = resolve;
            this._imageElement.onerror = reject;
        })
            .then(() => super.open())
            .catch(err => console.log(`Error opening popup image: ${err}`));
    }
}
