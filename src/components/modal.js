const handleEscKey = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
};

export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.classList.add('popup_is-animated');
    setTimeout(() => {
        modal.classList.add('popup_is-visible');
    }, 1);
    document.addEventListener('keydown', handleEscKey);
};

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKey);
};