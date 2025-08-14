//import { escape } from "core-js/fn/regexp";

import { likeCard, unlikeCard } from './api.js';

export function createCard(cardData, handleDeleteCard, handleOpenImage, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const cardId = cardData._id;

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;
    
    if (cardData.owner._id == userId) {
      deleteButton.addEventListener('click', () => handleDeleteCard(cardId, cardElement));
    } else {
      deleteButton.remove();
    }

    if (cardData.likes.some(like => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    cardImage.addEventListener('click', () => handleOpenImage(cardData.name, cardData.link));

    likeButton.addEventListener('click', () => {
      const isLiked = likeButton.classList.contains('card__like-button_is-active');
      const action = isLiked ? unlikeCard : likeCard;
      action(cardId)
        .then(updatedCard => {
          // Обновляем количество лайков с сервера
          likeCount.textContent = updatedCard.likes.length;
          likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.error(err));
  });

    return cardElement;
};