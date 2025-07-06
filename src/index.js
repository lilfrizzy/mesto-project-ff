// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../src/pages/index.css';
import {openModal, addingEventsListeners, closeModal, addModal} from '../src/components/modal.js';
import {initialCards, addCardForm, createCard, placeNameInput, linkInput, cardList} from '../src/components/cards.js';

const allPopups = document.querySelectorAll('.popup');
allPopups.forEach((popup) => {
    addingEventsListeners(popup);
    popup.classList.add('popup_is-animated');
});

function handleOpenImage(name, link) {
    const imageModal = document.querySelector('.popup_type_image');
    const popupImage = imageModal.querySelector('.popup__image');
    const popupCaption = imageModal.querySelector('.popup__caption');
    
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openModal(imageModal);
    addingEventsListeners(imageModal);
};

function handleAddCardSubmit(evt){
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value
  };

  const newCard = createCard(newCardData, handleDelete, handleOpenImage);
  cardList.prepend(newCard);
  closeModal(addModal);
  addCardForm.reset();
};

addCardForm.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach(cardData => {
    const initialCard = createCard(cardData, handleDelete, handleOpenImage);
    cardList.appendChild(initialCard);
});

function handleDelete (cardElement) {
    cardElement.remove()
};