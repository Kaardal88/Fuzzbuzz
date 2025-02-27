import { login } from "../auth/login.js";
import { save, saveToken } from "../auth/storage.js";
import { displayMessage } from "../utils/displayMessage.js";

export function loginHandler() {
  const form = document.querySelector("#login-form");
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));

  const fieldset = form.querySelector("fieldset");
  const button = form.querySelector("button");
  const container = document.querySelector("#message");

  try {
    fieldset.disabled = true;
    button.textContent = "Logging in...";
    const response = await login(data);
    console.log(response);

    const {
      data: { accessToken, name },
    } = response;

    console.log(response);

    console.log(name);

    saveToken(accessToken);
    console.log(accessToken);
    save("username", name);

    location.href = "/profile";
  } catch (error) {
    displayMessage(container, "warning", error.message);
  } finally {
    fieldset.disabled = false;
    button.textContent = "Submit";
  }
}
