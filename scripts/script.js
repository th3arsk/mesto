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

const cardContainer = document.querySelector('.elements');

function like(element) {
  const like = element.querySelector('.like-button');
  like.addEventListener('click', function() {
    like.classList.toggle('like-button_active');
  });
}

function deleteCard (element) {
  let deleteButton = element.querySelector('.delete-button');
  let deleteItem = deleteButton.closest('.element');
  deleteButton.addEventListener('click', () => {
    deleteItem.remove();
  });
}

const cardTemplate = document
.querySelector('.card-template')
.content;

function createCard(object) {
  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.element__name');
  const cardPicture = card.querySelector('.element__picture');

  cardName.textContent = object.name;
  cardPicture.src = object.link;

  deleteCard(card);
  like(card);
  
  return card;
}

function renderCards() {
  initialCards.forEach(item => {
    const cardHtml = createCard(item);
    cardContainer.append(cardHtml);
  })
}
renderCards();

function createNewCard(evt) {
  evt.preventDefault();
  const nameValue = document.querySelector('#card-name');
  const linkValue = document.querySelector('#image-link');

  const newCardData = {name: nameValue.value, link: linkValue.value};
  const newCard = createCard(newCardData);
  cardContainer.prepend(newCard);

  closeForm();
  deleteCard(newCard);
  like(newCard);
}

const createButton = document.querySelector('#add-popup');
createButton.addEventListener('submit', createNewCard);

const pictureTemplate = document
.querySelector('.picture-template')
.content;

const page = document.querySelector('page')
function createPictureWindow(element) {
  const picturePopup = pictureTemplate.cloneNode(true);
  const picture = picturePopup.querySelector('picture-popup__image');
  const caption = picturePopup.querySelector('picture-popup__caption');

  picture.src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';
  caption.textContent = 'Подпись';
}

