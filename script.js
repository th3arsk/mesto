const form = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.close-button');

function openForm() {
  form.classList.add('popup_opened');
}

editButton.addEventListener('click', openForm);

function closeForm() {
  form.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closeForm);

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('#name');
    let nameValue = nameInput.value;
    let profileNameElement = document.querySelector('.profile__name');
    profileNameElement.textContent = nameValue;  
    let jobInput = document.querySelector('#job');
    let jobValue = jobInput.value;
    let profileJobElement = document.querySelector('.profile__specialisation');
    profileJobElement.textContent = jobValue;  
    closeForm();
}

const popupForm = document.querySelector('#popup');
popupForm.addEventListener('submit', formSubmitHandler);

let likeButton1 = document.querySelector('#like_1');
let likeButton2 = document.querySelector('#like_2');
let likeButton3 = document.querySelector('#like_3');
let likeButton4 = document.querySelector('#like_4');
let likeButton5 = document.querySelector('#like_5');
let likeButton6 = document.querySelector('#like_6');

function like1() {
  likeButton1.classList.toggle('like-button_active');
}
likeButton1.addEventListener('click', like1);

function like2() {
  likeButton2.classList.toggle('like-button_active');
}
likeButton2.addEventListener('click', like2);

function like3() {
  likeButton3.classList.toggle('like-button_active');
}
likeButton3.addEventListener('click', like3);

function like4() {
  likeButton4.classList.toggle('like-button_active');
}
likeButton4.addEventListener('click', like4);

function like5() {
  likeButton5.classList.toggle('like-button_active');
}
likeButton5.addEventListener('click', like5);

function like6() {
  likeButton6.classList.toggle('like-button_active');
}
likeButton6.addEventListener('click', like6);


