import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupOfDelete from "../components/PopupOfDelete.js";

import "./index.css";

import {avatarForm, avatarButton,
  validationData, nameInput, jobInput, placeForm, profileForm, renderLoading} from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  authorization: '653fa548-6834-4cc4-a376-28fd07f6118e'   
});

let userId = null;

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([user, cards]) => {
  userId = user._id;

  console.log(user);
  userInfoClass.setUserInfo({
    name: user.name,
    job: user.about,
  });
  userInfoClass.setUserAvatar(user.avatar);

  console.log(cards);
  cardList.renderItems(cards.reverse());
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
    profileId: userId,
    handleCardClick: () => {
      cardImage.open(data.name, data.link);
    },
    handleCardDelete: (id) => {
      deletePopup.open()
      deletePopup.setSubmitHandler(() => {
        api.deleteCard(id)
        .then(renderLoading('.delete-popup', 'Удаление...'))
        .then(card.deleteCard())
        .then(deletePopup.close())
        .catch(err => console.log(`Ошибка.....: ${err}`))
        .finally(() => {
          renderLoading('.delete-popup', 'Да');
        });
      }); 
    },
    handleCardLike: (id) => {
      if ( card.isLiked(card._likes) ) {
        api.removeLike(id)
        .then(res => {
          card.updateLikesView(res.likes);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
      } else {
        api.like(id)
        .then(res => {
          card.updateLikesView(res.likes);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
      }
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
    .then(renderLoading('.add-popup', 'Сохранение...'))
    .then((result) => {
      cardList.addItem(createCard(result));
    })
    .then(placePopup.close())
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      renderLoading('.add-popup', 'Создать');
    });   
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
    api.postUserInfo({
      name: data.name,
      about: data.link
    })
    .then(renderLoading('.profile-popup', 'Сохранение...'))
    .then(userInfoClass.setUserInfo({name: data.name, job: data.link}))
    .then(userInfoPopup.close())
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      renderLoading('.profile-popup', 'Сохранить');
    }); 
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
    .then(renderLoading('.avatar-popup', 'Сохранение...'))
    .then(userInfoClass.setUserAvatar(data.avatar))
    .then(avatarPopup.close())
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      renderLoading('.avatar-popup', 'Сохранить');
    });
  }
});
avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  validateAvatarPopup.disableSubmitButton();
})
avatarPopup.setEventListeners();