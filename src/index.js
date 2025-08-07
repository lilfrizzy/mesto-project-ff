// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { openModal, closeModal } from '../src/components/modal.js';
import { initialCards, createCard, handleDeleteCard } from '../src/components/cards.js';

const profileEditModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('.popup_type_edit .popup__form');
const profileFormInputName = profileForm.querySelector('.popup__input');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.places__list');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const enableValidation = (config) => {
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

const checkInputValidity = (formElement, inputElement, config) => {
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

const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.setCustomValidity('');
  });
  
  toggleButtonState(formElement, config);
};

document.addEventListener('DOMContentLoaded', () => {
  enableValidation(validationConfig);
});

profileFormInputName.addEventListener('input', function() {
    checkInputValidity(profileForm, profileFormInputName, validationConfig)
});


function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profileEditModal);
};

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const cardElement = createCard(newCard, handleDeleteCard, openImagePopup);
    cardsContainer.prepend(cardElement);
    addCardForm.reset();
    closeModal(addCardModal);
};

function openImagePopup(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imageModal);
};

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup || evt.target.classList.contains('popup__close')) {
            closeModal(popup);
        }
    });
});

profileEditButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profileEditModal);
    clearValidation(profileForm, validationConfig);
});

addCardButton.addEventListener('click', () => {
    openModal(addCardModal)
    clearValidation(addCardForm, validationConfig);;
});
profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach(card => {
    const cardElement = createCard(card, handleDeleteCard, openImagePopup);
    cardsContainer.append(cardElement);
});