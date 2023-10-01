export default class UserInfo {
    constructor({nameSelector, aboutSelector, avatarSelector}, api) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        this._api = api;
    }

    loadProfileData() {
        this._api.getUserInfo()
            .then(res => {
                this._nameElement.textContent = res.name;
                this._aboutElement.textContent = res.about;
                this._avatarElement.src = res.avatar;
                sessionStorage.setItem("id", res._id);
            })
            .catch(err => console.log(err));
    }

    getUserInfo() {
        return this._api.getUserInfo()
            .then(res => res)
            .catch(err => console.log(err))
    }

    setUserInfo(userData, popup) {
        popup.renderLoading(true)
        this._api.patchUserInfo(userData)
            .then(res => {
                this._nameElement.textContent = res.name;
                this._aboutElement.textContent = res.about;
            })
            .catch(err => console.log(err))
            .finally(() => {
                popup.renderLoading(false)
                popup.close()
            })
    }

    setUserAvatar(imageLink, popup) {
        popup.renderLoading(true)
        this._api.patchUserAvatar(imageLink)
            .then(res => {
                this._avatarElement.src = res.avatar;
            })
            .catch(err => console.log(err))
            .finally(() => {
                popup.renderLoading(false);
                popup.close();
        })
    }
}
