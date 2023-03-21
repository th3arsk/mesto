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

const placeForm = document.querySelector('.add-popup');
const profileForm = document.querySelector('.profile-popup')

const cardImage = new PopupWithImage('.picture-popup');
cardImage.setEventListeners();

function createCard(data) {
 return new Card({
    data: data,
    templateSelector: '.card-template',
    handleCardClick: () => {
      cardImage.open(data.name, data.link);
    }
  });
}

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    cardList.addItem(createCard(item).generateCard());
  }
}, '.elements');
cardList.addItem(cardList.renderItems());

const validatePlacePopup = new FormValidator( validationData, placeForm )
validatePlacePopup.enableValidation();

const placePopup = new PopupWithForm({
  popupSelector: '.add-popup',
  submitFunction: (evt) => {
    evt.preventDefault();
    const newData = {name: `${nameValue.value}`, link: `${linkValue.value}`};

    cardList.addItem(createCard(newData).generateCard());
    validatePlacePopup.disableSubmitButton(placeForm.querySelector('.popup__button'));
    
    placePopup.close(); 
  }
});
document
.querySelector('.profile__add-button')
.addEventListener('click', () => {
  placePopup.open();
})
placePopup.setEventListeners();

const validateProfilePopup = new FormValidator( validationData, profileForm );
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

