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
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;  
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

function like () {
  let likes = document.querySelectorAll('.like-button');
  likes.forEach(like => like.addEventListener('click', function () {
    like.classList.toggle('like-button_active');
  }));
}

function createCard (image, name) {
  const card = `
    <div class="element">
      <img class="element__picture" src="${image}" alt="Картинка">
      <h2 class="element__name">${name}</h2>
      <button class="like-button" type="button"></button>
      <button class="delete-button" type="button"></button>
    </div>
    `
  return card;
}

//const deleteButton = element.querySelector('.delete-button');
//const deleteCard = () => {
//  element.remove();
 //};
 //deleteButton.addEventListener('click', deleteCard());

let cardsElements = document.querySelector('.elements');
function createCardImage () {
  initialCards.forEach(item => {
    const cardContent = createCard(item.link, item.name);
    cardsElements.innerHTML += cardContent;
  });

  like ();
}
createCardImage ();


let elements = document.querySelector('.elements');
let cards = document.querySelector('.element');

let cardName = document.querySelector('#card-name');
let imageLink = document.querySelector('#image-link');

function createNewCard (evt) {
  evt.preventDefault();
  cardsElements.insertAdjacentHTML(`afterbegin`,`
  <div class="element">
    <img class="element__picture" src="${imageLink.value}" alt="Картинка">
    <h2 class="element__name">${cardName.value}</h2>
    <button class="like-button" type="button"></button>
    <button class="delete-button" type="button"></button>
  </div>`) ;
    like();
    closeForm();
}

const createButton = document.querySelector('#add-popup');
createButton.addEventListener('submit', createNewCard);

let picture = document.querySelectorAll('.element__picture');

function createImage () {
  const image = `
  <section class="picture-popup">
    <div class="picture-popup__container">
      <img class="picture-popup__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg" alt="Картинка">
      <p class="picture-popup__caption">Подпись Картинка</p>
      <button class="close-button" type="button"></button>
    </div>
  </section>`

  return image;
}

function imagePopup () {
  const image = createImage();
  document.innerHTML = image;
}
imagePopup ();


  

