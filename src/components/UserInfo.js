/**
 * Управление пользовательской информацией.
 */
export default class UserInfo {
    /**
     * Создание.
     * @param nameSelector {String} - селектор имени.
     * @param aboutSelector {String} - селектор занятия.
     * @param avatarSelector {String} - селектор аватара.
     */
    constructor({nameSelector, aboutSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    /**
     * Установка информации пользователя.
     * @param name {String} - имя с сервера.
     * @param about {String} - занятие с сервера.
     * @param avatar {URL} - ссылка на аватар с сервера.
     */
    loadProfileData({name, about, avatar}) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._avatarElement.src = avatar;
        this._avatarElement.alt = name;
    }

    /**
     * Получить значения имени и занятия из разметки.
     * @returns {{name: string, about: string}}
     */
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent
        }
    }

    /**
     * Установить имени и занятия в разметку.
     * @param name {String} - установка имени в разметку.
     * @param about {String} - установка занятия в разметку.
     */
    setUserInfo(name, about) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._avatarElement.alt = name;
    }

    /**
     * Установка ссылки аватара в разметку.
     * @param imageLink {URL} - ссылка на аватар.
     */
    setUserAvatar(imageLink) {
        this._avatarElement.src = imageLink;
    }
}

