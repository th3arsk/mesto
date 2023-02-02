const resetError = (input, config) => {
  input.classList.remove(config.inputErrorClass);
}

const activateError = (input, config) => {
  input.classList.add(config.inputErrorClass);
}

const addErrorMessage = (message, config) => {
  message.classList.add(config.errorClass);
}

const removeErrorMessage = (message, config) => {
  message.classList.remove(config.errorClass);
}

const disableSubmitButton = (buttonElement,config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

const activateSubmitButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

function hasInvalidInput (inputList) {
    return inputList.some((element) => {
      return !element.validity.valid;
  }); 
}

function checkInputValidity (inputElement, config) {
  const formError = document.querySelector(`.${inputElement.id}-error`);
  if ( !inputElement.validity.valid ) {
    activateError(inputElement, config);
    addErrorMessage(formError, config);
  } else {
    resetError(inputElement, config); 
    removeErrorMessage(formError, config);
  }
}

function toggleButtonState (buttonElement, inputList, config) {
  if ( hasInvalidInput(inputList) ) {
    disableSubmitButton(buttonElement, config);
  } else {
    activateSubmitButton(buttonElement, config);
  }
}

function setEventListeners (formElement, buttonElement, inputList, config) {
  formElement.addEventListener('input', function(){
    toggleButtonState(buttonElement, inputList, config)
  });

  inputList.forEach(inputElement => inputElement.addEventListener('input', function(){
    checkInputValidity(inputElement, config)
    })   
  );
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    setEventListeners (formElement, buttonElement, inputList, config)
  }) 
}

const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationData);
