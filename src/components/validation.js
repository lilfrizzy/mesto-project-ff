export const validationConfig = {
  formSelector: '.popup__form, .popup__form-avatar',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => { 
        setEventListeners(formElement, config);
        toggleButtonState(formElement, config);
    });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  
  inputList.forEach((inputElement) => {
    if (inputElement.dataset.errorMessage) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    };
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, config);
    });
  });
};

export const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.pattern && inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage || 'Недопустимые символы');
    } else if (inputElement.type === 'url' && !inputElement.validity.valid) {
    inputElement.setCustomValidity('Введите корректный URL (начинается с http:// или https://)');
    } else {
    inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
    hideInputError(formElement, inputElement, config);
    }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!errorElement) return;
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!errorElement) return;
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }); 
};

const toggleButtonState = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    if (!buttonElement) return;
  
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.setCustomValidity('');
  });

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  }
  
  toggleButtonState(formElement, config);
};