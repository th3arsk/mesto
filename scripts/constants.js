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

const picturePopup = document.querySelector('.picture-popup');
const caption = document.querySelector('.picture-popup__caption');
const image = document.querySelector('.picture-popup__image');

const cardTemplate = document
.querySelector('.card-template')
.content;

const nameValue = document.querySelector('#card-name');
const linkValue = document.querySelector('#image-link');

const addPopupButton = addPopup.querySelector('.popup__button');