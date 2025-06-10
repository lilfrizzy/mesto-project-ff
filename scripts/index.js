// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;

function createCard (cardData, cardDelete) {
    const cardElement = template.querySelector('.card').cloneNode(true);
    const image = cardElement.querySelector('.card__image');
    const delButton = cardElement.querySelector('.card__delete-button');
    const title = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');

    image.src = cardData.link;
    /*image.alt = cardData.title*/
    title.textContent = cardData.name;

    delButton.addEventListener ('click', () => {
        cardDelete(cardElement)
    });

    return cardElement;
};

initialCards.forEach(cardData => {
    const initialCard = createCard(cardData, handleDelete);
    cardList.appendChild(initialCard);
});

function handleDelete (cardElement) {
    cardElement.remove()
};

