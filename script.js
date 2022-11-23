const form = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.close-button');
const likeButton = document.querySelector('.like-button');
const formSubmit = document.querySelector('.submit-button');

function openForm() {
  form.classList.add('popup_opened');
}

editButton.addEventListener('click', openForm);

function closeForm() {
  form.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closeForm);

let nameInput = document.querySelector('.popup__input');

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.getAttribute('value', 'name');

    let nameValue = nameInput.querySelector('value');
    nameValue.setAttribute('value', 'name');
    nameValue.textContent = 'Игорь';
}

formSubmit.addEventListener('submit', formSubmitHandler);



