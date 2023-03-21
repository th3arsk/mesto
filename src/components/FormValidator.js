export default class FormValidator {
  constructor( config, form ) {
    this._config = config;
    this._form = form;
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
  
  _activateError (inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    const message = this._form.querySelector(`.${inputElement.id}-error`);
    message.classList.add(this._errorClass);
    message.textContent = errorMessage;
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
      this._activateError(inputElement, inputElement.validationMessage);
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

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState (this._inputList, this._submitButton);
      });
    })
  }  

  enableValidation() {  
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._setEventListeners();
  }
}




