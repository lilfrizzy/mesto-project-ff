//import { escape } from "core-js/fn/regexp";

export function createCard(cardData, handleDeleteCard, handleOpenImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card_like-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
    cardImage.addEventListener('click', () => handleOpenImage(cardData.name, cardData.link));
    likeButton.addEventListener('click', () => {likeButton.classList.toggle('card__like-button_is-active')

    if (likeButton.classList.contains('card__like-button_is-active')) {
      likeCount.textContent = Number(likeCount.textContent) + 1;
    } else {
     likeCount.textContent = Number(likeCount.textContent) - 1;
    }
});

    return cardElement;
};

export function handleDeleteCard(cardElement) {
    cardElement.remove();
};