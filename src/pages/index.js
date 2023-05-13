import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupOfDelete from "../components/PopupOfDelete.js";

import "./index.css";

import {profileName, profileAbout,
  avatarPicture, avatarForm, avatarButton,
  validationData, nameInput, jobInput, placeForm, profileForm, renderLoading} from "../utils/constants.js";

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
.catch(err => console.log(`Ошибка.....: ${err}`));

const cardList = new Section((item) => {
  cardList.addItem(createCard(item));
}, '.elements');

const cardImage = new PopupWithImage('.picture-popup');
cardImage.setEventListeners();

const deletePopup = new PopupOfDelete({
  popupSelector: '.delete-popup',
});
deletePopup.setEventListeners();

function createCard(data) {
 const card = new Card({
    data: data,
    templateSelector: '.card-template',
    profileId: '4fc248f9674153129b05c864',
    handleCardClick: () => {
      cardImage.open(data.name, data.link);
    },
    handleCardDelete: (id) => {
      deletePopup.open()
      deletePopup.submitFormMethod(() => {
        api.deleteCard(id)
        .then((renderLoading('.delete-popup', 'Удаление...')))
        .then(card.deleteCard())
        .then(deletePopup.close())
        .catch(err => console.log(`Ошибка.....: ${err}`))
      }); 
    },
    handleCardLike: (id) => {
      api.like(id)
      .then(res => {
        card.getLikeCount(res.likes)
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
    },
    handleCardRemoveLike: (id) => {
      api.removeLike(id)
      .then(res => {
        card.getLikeCount(res.likes);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
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
    .then((renderLoading('.add-popup', 'Сохранение...')))
    .then((result) => {
      cardList.addItem(createCard(result));
    })
    .then(placePopup.close())
    .catch(err => console.log(`Ошибка.....: ${err}`))   
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
  jobSelector: '.profile__specialisation',
  avatarSelector: '.profile__avatar'
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
    .then((renderLoading('.profile-popup', 'Сохранение...')))
    .then(userInfoPopup.close())
    .catch(err => console.log(`Ошибка.....: ${err}`)); 
  }
});
document
.querySelector('.profile__edit-button')
.addEventListener('click', () => {
  userInfoPopup.open();
  const data = userInfoClass.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
})
userInfoPopup.setEventListeners();

const validateAvatarPopup = new FormValidator( validationData, avatarForm );
validateAvatarPopup.enableValidation();

const avatarPopup = new PopupWithForm({
  popupSelector: '.avatar-popup',
  submitFunction: (data) => {
    api.postUserAvatar(data.avatar)
    .then((renderLoading('.avatar-popup', 'Сохранение...')))
    .then(userInfoClass.setUserAvatar().src = data.avatar)
    .then(avatarPopup.close())
    .catch(err => console.log(`Ошибка.....: ${err}`));
  }
});
avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  validateAvatarPopup.disableSubmitButton();
})
avatarPopup.setEventListeners();







