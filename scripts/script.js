const form = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelectorAll('.close-button');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');
let profileNameElement = document.querySelector('.profile__name');
let profileJobElement = document.querySelector('.profile__specialisation');
const editFormContainer = document.querySelector('#edit-popup');

function openEditForm() {
  form.classList.add('popup_opened');
  editFormContainer.classList.remove('popup__container_closed');
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

editButton.addEventListener('click', openEditForm);

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    profileNameElement.textContent = nameValue;  
    let jobValue = jobInput.value;
    profileJobElement.textContent = jobValue;  
    closeForm();
}

const popupForm = document.querySelector('#edit-popup');
popupForm.addEventListener('submit', formSubmitHandler);

function closeForm() {
  form.classList.remove('popup_opened');
  let popupForm = document.querySelectorAll('.popup__container');
  popupForm.forEach(element => element.classList.add('popup__container_closed'));
}

closeButton.forEach(element => element.addEventListener('click', closeForm));

const addButton = document.querySelector('.add-button');
const AddFormContainer = document.querySelector('#add-popup');

function openAddForm() {
  form.classList.add('popup_opened');
  AddFormContainer.classList.remove('popup__container_closed');
}

addButton.addEventListener('click', openAddForm);

let likes = document.querySelectorAll('.like-button');
likes.forEach(like => like.addEventListener('click', function () {
  like.classList.toggle('like-button_active');
}));

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







