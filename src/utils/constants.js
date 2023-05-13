export {profileName, profileAbout,
     avatarPicture, avatarForm, avatarButton,
     validationData, nameInput, jobInput, placeForm, profileForm, renderLoading}

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__specialisation');
const avatarPicture = document.querySelector('.profile__avatar');

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

  const currentText = currentActiveButton.textContent;
  currentActiveButton.textContent = text;
  setTimeout(()=>{
    currentActiveButton.textContent = currentText;
  }, 1000)
}; 