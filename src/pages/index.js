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
 const card = new Card({
    data: data,
    templateSelector: '.card-template',
    handleCardClick: () => {
      cardImage.open(data.name, data.link);
    }
  });
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.elements');
cardList.addItem(cardList.renderItems());

const validatePlacePopup = new FormValidator( validationData, placeForm )
validatePlacePopup.enableValidation();

const placePopup = new PopupWithForm({
  popupSelector: '.add-popup',
  submitFunction: (data) => {
    const newData = data;

    cardList.addItem(createCard(newData));
    
    
    placePopup.close(); 
  }
});
document
.querySelector('.profile__add-button')
.addEventListener('click', () => {
  placePopup.open();
  validatePlacePopup.disableSubmitButton();
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
  submitFunction: (data) => {
    userInfoClass.setUserInfo({
      name: data.name,
      job: data.link
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

const avatarForm = document.querySelector('.avatar-popup__form');
const avatarPicture = document.querySelector('.profile__avatar');

const validateAvatarPopup = new FormValidator( validationData, avatarForm );
validateAvatarPopup.enableValidation();

const avatarPopup = new PopupWithForm({
  popupSelector: '.avatar-popup',
  submitFunction: (data) => {
    avatarPicture.src = data;
    avatarPopup.close(); 
  }
});
avatarPicture.addEventListener('click', () => {
  avatarPopup.open();
  validateAvatarPopup.disableSubmitButton();
})
avatarPopup.setEventListeners();

const deletePopup = new PopupWithForm({
  popupSelector: '.delete-popup',
  submitFunction: () => {
    deletePopup.close(); 
  }
});
avatarPicture.addEventListener('click', () => {
  deletePopup.open();
})
deletePopup.setEventListeners();

