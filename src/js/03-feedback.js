import throttle from 'lodash.throttle';

const formInfo = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input[type=email]'),
};
const input = formInfo.form.elements;
const storageKey = 'feedback-form-state';
const savedData = localStorage.getItem(storageKey);
const formData = {};

formInfo.form.addEventListener('submit', onFormSubmit);
formInfo.email.addEventListener('input', throttle(onInput, 500));
formInfo.textarea.addEventListener('input', throttle(onInput, 500));

function inputValue() {
  formData.email = input.email.value;
  formData.message = input.message.value;
}

if (savedData) {
  const formData = JSON.parse(savedData);
  formInfo.email.value = formData.email;
  formInfo.textarea.value = formData.message;
}

function onInput(event) {
  inputValue();
  localStorage.setItem(storageKey, JSON.stringify(formData));
}
function onFormSubmit(event) {
  event.preventDefault();
  inputValue();
  if (input.email.value === '' || input.message.value === '') {
    alert();
  } else {
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(storageKey);
  }
}
