export {avatarForm, avatarButton,
     validationData, nameInput, jobInput, placeForm, profileForm, renderLoading}

const avatarForm = document.querySelector('.avatar-popup__form');
const avatarButton = document.querySelector('.profile__avatar-container');

const validationData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
  
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
  
const placeForm = document.querySelector('.add-popup');
const profileForm = document.querySelector('.profile-popup');

const renderLoading = (popupSelector, text) => {
  const popup = document.querySelector(popupSelector)
  const currentActiveButton = popup.querySelector(`.popup__button`);

  currentActiveButton.textContent = text;

}; 