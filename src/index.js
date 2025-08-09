// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { openModal, closeModal } from '../src/components/modal.js';
import { createCard, handleDeleteCard } from '../src/components/cards.js';
import { validationConfig, enableValidation, clearValidation, checkInputValidity } from '../src/components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard } from '../src/components/api.js';

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

document.addEventListener('DOMContentLoaded', () => {
  enableValidation(validationConfig);
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

    //Отрисовываем карточки
    cards.forEach((card) => {
      const cardElement = createCard(card, handleDeleteCard, openImagePopup);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
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
    
    updateUserInfo({
        name: nameInput.value,
        about: jobInput.value
    })
    .then((updatedUser) => {
        profileName.textContent = updatedUser.name;
        profileDescription.textContent = updatedUser.about;
        closeModal(profileEditModal);
    })
    .catch((err) => {
        console.error(err);
    });
};

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    addNewCard({
        name: cardNameInput.value,
        link: cardLinkInput.value
    })
    .then((newCardFromServer) => {
        const cardElement = createCard(newCardFromServer, handleDeleteCard, openImagePopup);
        cardsContainer.prepend(cardElement);
        addCardForm.reset();
        closeModal(addCardModal);
    })
    .catch((err) => {
        console.error(err);
    });
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