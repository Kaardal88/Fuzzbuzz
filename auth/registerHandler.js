import { register } from "../../auth/register.js";

export function registerHandler() {
  console.log(registerHandler);
  const form = document.querySelector("#form");
  //If form excists. Do stuff
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  if (data.bio.trim() === "") {
    delete data.bio;
  }

  if (data.avatarUrl.trim() === "") {
    delete data.avatarUrl;
  } else {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${data.name}'s avatar!`,
    };
    delete data.avatarUrl;
  }

  console.log(data);
  register(data);
}
