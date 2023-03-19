import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

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

const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      templateSelector: '.card-template',
      handleCardClick: () => {
        const cardImage = new PopupWithImage('.picture-popup');
        cardImage.open(item.name, item.link);
        cardImage.setEventListeners();
      }
    });
    const cardElement = card.generateCard();
    return cardElement
  }
}, cardContainer);
cardList.addItem();

const validatePlacePopup = new FormValidator( validationData, '.add-popup' )
validatePlacePopup.enableValidation();

const placePopup = new PopupWithForm({
  popupSelector: '.add-popup',
  submitFunction: (evt) => {
    evt.preventDefault();
    const newData = {name: `${nameValue.value}`, link: `${linkValue.value}`};

    const newCard = new Card({
      data: newData,
      templateSelector: '.card-template',
      handleCardClick: () => {
        const cardImage = new PopupWithImage('.picture-popup');
        cardImage.open(newData.name, newData.link);
        cardImage.setEventListeners();
      }
    });
    const newCardElement = newCard.generateCard();
    cardContainer.prepend(newCardElement);
    
    placePopup.close(); 
  }
});
document
.querySelector('.profile__add-button')
.addEventListener('click', () => {
  placePopup.open();
})
placePopup.setEventListeners();

const validateProfilePopup = new FormValidator( validationData, '.profile-popup' )
validateProfilePopup.enableValidation();

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const userInfoClass = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__specialisation'
});

const userInfoPopup = new PopupWithForm({
  popupSelector: '.profile-popup',
  submitFunction: (evt) => {
    evt.preventDefault();
  
    userInfoClass.setUserInfo({
      name: nameInput.value,
      job: jobInput.value
    })

    userInfoPopup.close(); 
  }
});
document
.querySelector('.profile__edit-button')
.addEventListener('click', () => {
  userInfoPopup.open();
  nameInput.value = userInfoClass.getUserInfo().name;
  jobInput.value = userInfoClass.getUserInfo().job;
})
userInfoPopup.setEventListeners();




