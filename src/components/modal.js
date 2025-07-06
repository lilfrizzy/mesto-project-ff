import {fillProfileForm} from './cards.js'

export const profileEditModal = document.querySelector('.popup_type_edit');
export const addModal = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

editButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profileEditModal);
});

addButton.addEventListener('click', () => {
  openModal(addModal)
});

export const addingEventsListeners = (popupElement) => {
  const closeButton = popupElement.querySelector('.popup__close');

  closeButton.addEventListener('click', () => {
    closeModal(popupElement);
  });

  popupElement.addEventListener('mousedown', (event) => {
    if (event.target === popupElement) {
      closeModal(popupElement)
    }
  });
};

addingEventsListeners(profileEditModal);
addingEventsListeners(addModal);