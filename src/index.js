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
});

addCardButton.addEventListener('click', () => openModal(addCardModal));
profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach(card => {
    const cardElement = createCard(card, handleDeleteCard, openImagePopup);
    cardsContainer.append(cardElement);
});