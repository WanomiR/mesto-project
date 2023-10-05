/**
 * Управление вставкой элементов.
 */
export default class Section {
    /**
     * Создание.
     * @param data {Array} - массив объектов для рендера.
     * @param renderer {Function} - функция отрисовки.
     * @param containerSelector {String} - селектор контейнера.
     */
    constructor({data, renderer}, containerSelector) {
        this._itemsToRender = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    /**
     * Добавление элемента в контейнер.
     * @param element {Node} - отрисовываемый элемент.
     */
    appendItem(element) {
        this._container.append(element);
    }

    prependItem(element) {
        this._container.prepend(element);
    }

    /**
     * Очищение контейнера.
     */
    clear() {
        this._container.innerHTML = '';
    }

    /**
     * Отрисовка элементов.
     */
    renderItems() {
        this._itemsToRender.forEach(item => {
            this._renderer(item);
        })
    }
}
