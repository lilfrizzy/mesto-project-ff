export const profileEditModal = document.querySelector('.popup_type_edit');
export const addCardModal = document.querySelector('.popup_type_new-card');
export const imageModal = document.querySelector('.popup_type_image');

const handleEscKey = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
};

export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKey);
};

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKey);
};