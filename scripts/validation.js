const resetError = (input) => {
  input.classList.remove('popup__input_type_error');
}

const activateError = (input) => {
  input.classList.add('popup__input_type_error');
}

const addErrorMessage = (message) => {
  message.classList.add('popup__error_visible');
}

const removeErrorMessage = (message) => {
  message.classList.remove('popup__error_visible');
}

const disableSubmitButton = (buttonElement) => {
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.disabled = true;
}

const activateSubmitButton = (buttonElement) => {
  buttonElement.classList.remove('popup__button_disabled');
  buttonElement.disabled = false;
}

function hasInvalidInput (inputList) {
    return inputList.some((element) => {
      return !element.validity.valid;
  }); 
}

function inputValidation(inputElement) {
  const formError = document.querySelector(`.${inputElement.id}-error`);
  inputElement.addEventListener('input', function() {
    if ( !inputElement.validity.valid ) {
      activateError(inputElement);
      addErrorMessage(formError);
    } else {
      resetError(inputElement); 
      removeErrorMessage(formError);
    }
  });
}

function buttonState (formElement, buttonElement, inputList) {
  formElement.addEventListener('input', function() {
      if ( hasInvalidInput(inputList) ) {
        disableSubmitButton(buttonElement);
     } else {
       activateSubmitButton(buttonElement);
      }
  }) 
}

function enableValidation(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__button');

  inputList.forEach(element => inputValidation(element));

  buttonState(form, buttonElement, inputList);
  
}

enableValidation(profileForm);
enableValidation(placeForm);