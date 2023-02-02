function openPopup(popup) {
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
  popup.classList.remove('popup_opened');
}

closeButtons.forEach(button => {
  const popup = button.closest('.popup');

  button.addEventListener('click', function() {
    closePopup(popup);
  });

  document.body.addEventListener('keydown', function(evt) {
    if ((evt.key === 'Escape') && (popup.classList.contains('popup_opened'))) {
      closePopup(popup);
    }
  });

  popup.addEventListener('click', function(evt) {
    const popupContent = (popup.querySelector('.popup__form') || popup.querySelector('.picture-popup__container'));
    const formArea = evt.composedPath().includes(popupContent);
    if ( evt.target = !formArea ) {
      closePopup(popup);
    }
  });
});

function openPicture (element) {
  const picture = element.querySelector('.element__picture');
  const name = element.querySelector('.element__name');

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
  const deleteButton = element.querySelector('.delete-button');
  const deleteItem = deleteButton.closest('.element');
  deleteButton.addEventListener('click', () => {
    deleteItem.remove();
  });
}

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




