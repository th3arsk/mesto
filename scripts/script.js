function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEscapeListener(popup);
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

const addEscapeListener = (popup) => {
  document.addEventListener('keydown', function(evt) {
    if ((evt.key === 'Escape')) {
      closePopup(popup);
    }
  });
}

const removeEscapeListener = (popup) => {
  document.removeEventListener('keydown', function(evt) {
    if ((evt.key === 'Escape')) {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const closePopupOutArea = (popup) => {
  popup.addEventListener('click', function(e) {
    if ( e.target === e.currentTarget ) {
      closePopup(popup);
    }
  });
}

closeButtons.forEach(button => {
  const popup = button.closest('.popup');

  button.addEventListener('click', function() {
    closePopup(popup);
  });

  closePopupOutArea(popup);

  removeEscapeListener(popup);
});

function setPictureListener (card) {
  const picture = card.querySelector('.element__picture');
  const name = card.querySelector('.element__name');

  picture.addEventListener('click', function() {
  
    openPopup(picturePopup)
    
    image.src = picture.src;
    image.alt = 'Фото ' + name.textContent + 'а';
    caption.textContent = name.textContent;
  })
}

function toggleLikeButton(card) {
  const like = card.querySelector('.like-button');
  like.addEventListener('click', function() {
    like.classList.toggle('like-button_active');
  });
}

function setDeleteButton (card) {
  const buttonDelete = card.querySelector('.delete-button');
  const cardElement = buttonDelete.closest('.element');
  buttonDelete.addEventListener('click', () => {
    cardElement.remove(card);
  });
}

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardName = card.querySelector('.element__name');
  const cardPicture = card.querySelector('.element__picture');

  cardName.textContent = cardData.name;
  cardPicture.src = cardData.link;
  cardPicture.alt = 'Фото ' + cardData.name + 'а';

  setPictureListener(card);
  setDeleteButton (card);
  toggleLikeButton(card);
  
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

  const newCardData = {name: nameValue.value, link: linkValue.value};
  const newCard = createCard(newCardData);
  cardContainer.prepend(newCard);

  nameValue.value = '';
  linkValue.value = '';
  addPopupButton.disabled = true;
  addPopupButton.classList.add('popup__button_disabled');
  
  
  closePopup(addPopup);
}

addPopup.addEventListener('submit', createNewCard);




