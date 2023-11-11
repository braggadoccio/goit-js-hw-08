import throttle from "lodash.throttle";

const form = document.querySelector("feedback-form");

const emailInput = document.querySelector("email");
const messageInput = document.querySelector("message");

const throttledUpdateStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}, 500);

form.addEventListener("input", throttledUpdateStorage);

const formData = JSON.parse(localStorage.getItem("feedback-form-state"));

if (formData) {
  emailInput.value = formData.email;
  messageInput.value = formData.message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  localStorage.removeItem("feedback-form-state");
  emailInput.value = "";
  messageInput.value = "";

  const formData = new FormData(form);

  console.log(formData);
});
