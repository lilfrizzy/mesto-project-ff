//import { escape } from "core-js/fn/regexp";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// функционал редактирования профиля
import {closeModal} from './modal.js';
import {profileEditModal} from './modal.js';

const profileForm = document.querySelector('.popup_type_edit .popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

export const fillProfileForm = () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profileEditModal);
}
profileForm.addEventListener('submit', handleFormSubmit);

// функционал добавления карточки

export const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
export const placeNameInput = addCardForm.querySelector('.popup__input_type_card-name');
export const linkInput = addCardForm.querySelector('.popup__input_type_url');
export const cardList = document.querySelector('.places__list');

const template = document.querySelector('#card-template').content;

export function createCard (cardData, cardDelete, handleOpenImage, handleLikeCard) {
    const cardElement = template.querySelector('.card').cloneNode(true);
    const image = cardElement.querySelector('.card__image');
    const delButton = cardElement.querySelector('.card__delete-button');
    const title = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    delButton.addEventListener ('click', () => {
        cardDelete(cardElement)
    });

    image.addEventListener('click', () => handleOpenImage(cardData.name, cardData.link));

    likeButton.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active')
      };
    });

    return cardElement;
};