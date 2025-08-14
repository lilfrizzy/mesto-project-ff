import './pages/index.css';
import { openModal, closeModal } from '../src/components/modal.js';
import { createCard } from '../src/components/cards.js';
import { validationConfig, enableValidation, clearValidation } from '../src/components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard, updateUserAvatar } from '../src/components/api.js';

const profileEditModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const confirmDeleteModal = document.querySelector('.popup_type_confirm-delete');
const confirmDeleteForm = confirmDeleteModal.querySelector('.popup__form');

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

const avatarModal = document.querySelector('.popup_type_avatar');
const avatarForm = avatarModal.querySelector('.popup__form-avatar');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');

let userId = null;
let cardToDelete = null;
let cardIdToDelete = null;

function renderLoading(buttonElement, isLoading, loadingText = 'Сохранение...', defaultText = 'Сохранить') {
  buttonElement.textContent = isLoading ? loadingText : defaultText;
}

function handleDeleteClick(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(deletePopup);
}

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;
  
  renderLoading(submitButton, true);

  updateUserAvatar(avatarInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error);
});

confirmDeleteForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;
  
  renderLoading(submitButton, true);

  deleteCard(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(deletePopup);
      cardToDelete = null;
      cardIdToDelete = null;
    })
    .catch((err) => console.log(err));
});

document.addEventListener('DOMContentLoaded', () => {
  enableValidation(validationConfig);
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((card) => {
      const cardElement = createCard(card, handleDeleteCard, openImagePopup, userId);
      cardsContainer.append(cardElement);
    });
  })
  .catch(console.error);

function handleDeleteCard(cardId, cardElement) {
  cardIdToDelete = cardId;
  cardToDelete = cardElement;
  openModal(confirmDeleteModal);
}

confirmDeleteForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCard(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(confirmDeleteModal);
    })
    .catch(console.error);
});

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  
  renderLoading(submitButton, true);

  updateUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(submitButton, false);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  
  renderLoading(submitButton, true);  

  addNewCard({ name: cardNameInput.value, link: cardLinkInput.value })
    .then((card) => {
      const cardElement = createCard(card, handleDeleteCard, openImagePopup, userId);
      cardsContainer.prepend(cardElement);
      addCardForm.reset();
      closeModal(addCardModal);
    })
    .catch(console.error);
}

function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imageModal);
}

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

profileImage.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarModal);
});

profileEditButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(profileEditModal);
  clearValidation(profileForm, validationConfig);
});

addCardButton.addEventListener('click', () => {
  openModal(addCardModal);
  clearValidation(addCardForm, validationConfig);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);