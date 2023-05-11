import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupOfDelete from "../components/PopupOfDelete.js";

import "./index.css";

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__specialisation');
const avatarPicture = document.querySelector('.profile__avatar');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  authorization: '653fa548-6834-4cc4-a376-28fd07f6118e'   
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([user, cards]) => {
  console.log(user)
  profileName.textContent = user.name;
  profileAbout.textContent = user.about;
  avatarPicture.src = user.avatar;

  console.log(cards)
  cardList.renderItems(cards.reverse())
})
.catch((err) => console.log(err));

const cardList = new Section((item) => {
  cardList.addItem(createCard(item));
}, '.elements');

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
const profileForm = document.querySelector('.profile-popup')

const cardImage = new PopupWithImage('.picture-popup');
cardImage.setEventListeners();
const deletePopup = new PopupOfDelete({
  popupSelector: '.delete-popup'
});
deletePopup.setEventListeners();
const confimDelete = document.querySelector('#delete-card')

function createCard(data) {
 const card = new Card({
    data: data,
    templateSelector: '.card-template',
    profileId: '4fc248f9674153129b05c864',
    handleCardClick: () => {
      cardImage.open(data.name, data.link);
    },
    openDeletePopup: (button) => {
      button.addEventListener('click', ()=>{
        deletePopup.open();
      })
    },
    closeDeletePopup: () => {
      deletePopup.close();
    },
    handleCardDelete: (id) => {
      api.deleteCard(id)
    },
    confimDelete: confimDelete,
    putLike: (id) => {
      api.putLike(id)
    },
    removeLike: (id) => {
      api.removeLike(id)
    }
  })  
  return card.generateCard(); 
}

const validatePlacePopup = new FormValidator( validationData, placeForm )
validatePlacePopup.enableValidation();

const placePopup = new PopupWithForm({
  popupSelector: '.add-popup',
  submitFunction: (data) => {
    const newData = data;

    api.postCard(newData)
    .then(api.getInitialCards())
    .then(res => res.json())
    .then((result) => {
      cardList.addItem(createCard(result));
    })
    .catch((err) => console.log(err))
    .finally(placePopup.close());  
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
    
    api.postUserInfo({
      name: data.name,
      about: data.link
    })
    .catch((err) => console.log(err));

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
const avatarButton = document.querySelector('.profile__avatar-container');

const validateAvatarPopup = new FormValidator( validationData, avatarForm );
validateAvatarPopup.enableValidation();

const avatarPopup = new PopupWithForm({
  popupSelector: '.avatar-popup',
  submitFunction: (data) => {
    api.postUserAvatar(data.avatar);
    avatarPicture.src = data.avatar;
    
    avatarPopup.close(); 
  }
});
avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  validateAvatarPopup.disableSubmitButton();
})
avatarPopup.setEventListeners();







