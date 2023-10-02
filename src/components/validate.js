/**
 * Отображает поле с текстом ошибки.
 * @param form {Object} - форма в которой проверяем поле.
 * @param element {Object} - проверяемое поле ввода.
 * @param errorText {String} - строка с текстом ошибки, который должен быть отображен в поле.
 * @param validationConf {Object} - объект с названиями классов.
 */
function showInputError(form, element, errorText, validationConf){
  const errorElement = form.querySelector(`.${element.id}-error`);

  errorElement.textContent = errorText;
  errorElement.classList.add(validationConf.visibleErrorClass);
}

/**
 * Скрывает поле с тестом ошибки.
 * @param form {Object} - форма в которой проверяем поле.
 * @param element {Object} - проверяемое поле ввода.
 * @param validationConf {Object} - объект с названиями классов.
 */
export function hideInputError(form, element, validationConf){
  const errorElement = form.querySelector(`.${element.id}-error`);

  errorElement.classList.remove(validationConf.visibleErrorClass);
  errorElement.textContent = "";
}

/**
 * Деактивирует кнопку подтверждения на форме.
 * @param form {Object} - форма в которой отключаем кнопку.
 * @param validationConf {Object} - объект с названиями классов.
 */
export function disableSubmitButton(form, validationConf) {
  const button = form.querySelector(validationConf.submitBtnClass);

  button.classList.add(validationConf.disabledSubmitBtnClass);
  button.setAttribute("disabled", "disabled");
}

/**
 * Активирует кнопку подтверждения на форме.
 * @param form {Object} - форма в которой отключаем кнопку.
 * @param validationConf {Object} - объект с названиями классов.
 */
function enableSubmitButton(form, validationConf) {
  const button = form.querySelector(validationConf.submitBtnClass);

  button.classList.remove(validationConf.disabledSubmitBtnClass);
  button.removeAttribute("disabled");
}

/**
 * Выполняет проверку валидности в поле и управляет отображением или скрытием поля с текстом ошибки.
 * @param form {Object} - форма в которой выполняем проверку.
 * @param input {Object} - проверяемое поле ввода.
 * @param validationConf {Object} - объект с названиями классов.
 */
function isValid(form, input, validationConf){
  const arrayInputs = Array.from(form.querySelectorAll(".popup__input"));
  const hasInvalidField = arrayInputs.some(input => {
    return input.validity.valid === false;
  });

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (hasInvalidField) {
    showInputError(form, input, input.validationMessage, validationConf);
    disableSubmitButton(form, validationConf);
  } else {
    hideInputError(form, input, validationConf);
    enableSubmitButton(form, validationConf);
  }
}

/**
 * Устанавливает слушатели на все поля в форме.
 * @param form {Object} - форма в которой выполняем проверку.
 * @param validationConf {Object} - объект с названиями классов.
 */
function setListenersOnForm(form, validationConf) {
  const arrayInputOfForm = Array.from(form.querySelectorAll(validationConf.inputClass));

  arrayInputOfForm.forEach(input =>{
    input.addEventListener("input", () => {
      isValid(form, input, validationConf);
    });
  });
}

/**
 * Функция, управляющая валидацией и запускающая ее.
 * @param validationConf {Object} - объект с названиями классов.
 */
export function enableValidations(validationConf) {
  const arrayForms = Array.from(document.querySelectorAll(validationConf.formClass));

  arrayForms.forEach(form => {
    setListenersOnForm(form, validationConf);
  });
}
