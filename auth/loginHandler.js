import { login } from "../../auth/login.js";
import { API_KEY } from "../../constants/api.js";

export const BASE_URL = "https://v2.api.noroff.dev/";
export const REG_URL = "auth/register";
export const LOGIN_URL = "auth/login";
export const CREATE_POST_URL = "social/posts";
export const API_KEY_URL = "create-api-key";

export function loginHandler() {
  const form = document.querySelector("#form");
  //If form excists. Do stuff
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  //Get input values from the form
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);

  const fieldset = form.querySelector("fieldset");
  const button = form.querySelector("button");

  try {
    fieldset.disabled = true;
    button.textContent = "Logging in...";
    const response = await login(data);
    console.log(response);

    const {
      data: { accessToken, name },
    } = response;
    console.log(userData);

    const { data: userData } = response;
    //const { accessToken, name } = userData;

    // Save the token in local storage
    saveToken(accessToken);
    saveUsername(name);
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("username", userData.name);

    localStorage.getItem("token");

    location.href = "/profile/index.html";
  } catch (error) {
    console.log(error);
    displayMessage(container, "warning", error.message);
  } finally {
    fieldset.disabled = false;
    button.textContent = "Submit";
  }
}

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
  return JSON.parse(localStorage.getItem(key));
}

export async function getAPIKey() {
  const response = await fetch(BASE_URL + API_KEY_URL + API_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey.data.key,
    },
    body: JSON.stringify(key),
  });

  if (response.ok) {
    return await response.json();
  }
  console.error(await response.json());
  throw new Error("Could not register for an API key...!");
}
