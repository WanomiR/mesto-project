
const ESC_KEY = "Escape";

/**
 * Открытие нужного попапа через добавление класса.
 * @param popup {Object} - попап который следует открыть.
 */
export function addingClassToOpenPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlerClosePopupOnEsc);
}

/**
 * Закрытие нужного попапа через удаление класса.
 * @param popup {Object} - попап который следует закрыть.
 */
export function removeClassToClosePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlerClosePopupOnEsc);
}

/**
 * Функция, которая позволяет закрыть попап нажатием на кнопку Esc.
 * @param evt {Object} - объект события.
 */
function handlerClosePopupOnEsc(evt) {
  if (evt.key === ESC_KEY) {
    removeClassToClosePopup(document.querySelector(".popup_opened"));
  }
}

/**
 * Позволяет реагировать попапу как на клик по крестику, так и на клик по оверлею.
 * @param evt {Object} - событие клика.
 */
export function handlerClosePopupOnOverlayOrCloseBtn(evt) {
  const popup = document.querySelector(".popup_opened");

  if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-btn")) {
    removeClassToClosePopup(popup);
  }
}
