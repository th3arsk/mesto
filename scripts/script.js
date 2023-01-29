const popups = document.querySelector('.popups');
const closeButton = document.querySelectorAll('.popup__close-button');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__specialisation');

const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');

function openPopup(popup) {
  popups.classList.add('popups_active');
  popup.classList.add('popup_opened');
}

document.querySelector('.profile__edit-button').addEventListener('click', function() {
  openPopup(profilePopup);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

document.querySelector('.profile__add-button').addEventListener('click', function() {
  openPopup(addPopup);
});

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;  
    closePopup(profilePopup);
}
profilePopup.addEventListener('submit', handleProfileFormSubmit);

function closePopup(popup) {
  popups.classList.remove('popups_active');
  popup.classList.remove('popup_opened');
}

closeButton.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', function() {
    closePopup(popup);
  });
})

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

function openPicture (element) {
  let picture = element.querySelector('.element__picture');
  let name = element.querySelector('.element__name');

  picture.addEventListener('click', function() {
  
    openPopup(picturePopup)
    
    image.src = picture.src;
    image.alt = 'Фото ' + name.textContent + 'а';
    caption.textContent = name.textContent;
  })
}

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
  cardPicture.alt = 'Фото ' + object.name + 'а';

  openPicture(card);
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

const nameValue = document.querySelector('#card-name');
const linkValue = document.querySelector('#image-link');

function createNewCard(evt) {
  evt.preventDefault();

  const newCardData = {name: nameValue.value, link: linkValue.value};
  const newCard = createCard(newCardData);
  cardContainer.prepend(newCard);

  nameValue.value = '';
  linkValue.value = '';

  closePopup(addPopup);
}

addPopup.addEventListener('submit', createNewCard);




