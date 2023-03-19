export default class FormValidator {
  constructor( config, formSelector ) {
    this._config = config;
    this._form = document.querySelector(formSelector);
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _resetError (inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const message = document.querySelector(`.${inputElement.id}-error`);
    message.classList.remove(this._errorClass);
  }
  
  _activateError (inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const message = document.querySelector(`.${inputElement.id}-error`);
    message.classList.add(this._errorClass);
  }

  disableSubmitButton (buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }
  
  _activateSubmitButton (buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }
  
  _hasInvalidInput (inputList) {
    return inputList.some((element) => {
      return !element.validity.valid;
    }); 
  }

  _checkInputValidity (inputElement) {
    if ( !inputElement.validity.valid ) {
      this._activateError(inputElement);
    } else {
      this._resetError(inputElement); 
    }
  }

  _toggleButtonState (inputList, buttonElement) {
    if ( this._hasInvalidInput(inputList) ) {
      this.disableSubmitButton(buttonElement);
    } else {
      this._activateSubmitButton(buttonElement);
    }
  }

  _setEventListeners(inputList, buttonElement) {
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
      });
    })

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState (inputList, buttonElement);
      });
    }) 
  }  

  enableValidation() {  
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._setEventListeners(this._inputList, this._submitButton);
  }
}




