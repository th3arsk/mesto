import { Card } from "./Card.js";

import { FormValidator } from "./FormValidator.js"

const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const closeButtons = document.querySelectorAll('.popup__close-button');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__specialisation');

const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardContainer = document.querySelector('.elements');

const nameValue = document.querySelector('#card-name');
const linkValue = document.querySelector('#image-link');

const addPopupButton = addPopup.querySelector('.popup__button');

const validateProfilePopup = new FormValidator( validationData, profilePopup )
validateProfilePopup.enableValidation();

const validateAddPopup = new FormValidator( validationData, addPopup )
validateAddPopup.enableValidation();

const picturePopup = document.querySelector('.picture-popup');
const caption = picturePopup.querySelector('.picture-popup__caption');
const image = picturePopup.querySelector('.picture-popup__image');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEsc);
} 

export { openPopup, picturePopup, caption, image} ;

document.querySelector('.profile__edit-button').addEventListener('click', function() {
  openPopup(profilePopup);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});
  
document.querySelector('.profile__add-button').addEventListener('click', function() {
  openPopup(addPopup);
});
  
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;  
  closePopup(profilePopup);
}
profilePopup.addEventListener('submit', handleProfileFormSubmit);
  
  
function handleCloseByEsc (evt) {
  if ((evt.key === 'Escape')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }   
}
  
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEsc);
}
  
const closePopupOutArea = (popup) => {
  popup.addEventListener('click', function(e) {
    if ( e.target === e.currentTarget ) {
      closePopup(popup);
    }
  });
}
  
closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  
  button.addEventListener('click', function() {
    closePopup(popup);
  });
  
  closePopupOutArea(popup);
});

function createCard(item) {
  const card = new Card( item, '.card-template');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);

  return cardElement
}

initialCards.reverse().forEach(dataItem => {
  createCard(dataItem);
});

function createNewCard(evt) {
  evt.preventDefault();
  
  const newData = {name: `${nameValue.value}`, link: `${linkValue.value}`};
  createCard(newData);
  
  nameValue.value = '';
  linkValue.value = '';
  closePopup(addPopup);
  validation.disableSubmitButton(addPopupButton);
}
  
addPopup.addEventListener('submit', createNewCard);
  


