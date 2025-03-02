import { createPost } from "../api/posts/createPost.js";
import { displayMessage } from "../utils/displayMessage.js";

export async function createPostHandler() {
  const createPostForm = document.querySelector("#postForm");
  if (createPostForm) {
    createPostForm.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const post = {
    title: data.title,
    body: data.body,
  };

  if (data.mediaUrl.trim() !== "") {
    post.media = {};
    post.media.url = data.mediaUrl;
    post.media.alt = data.mediaAlt;
  }

  const fieldset = form.querySelector("fieldset") || form;
  const submitButton = form.querySelector("#confettiButton");

  try {
    fieldset.disabled = true;
    submitButton.textContent = "Publishing...";
    await createPost(post);
    window.location.href = "/feed/index.html";
  } catch (error) {
    console.error("Error creating post:", error.message);
    displayMessage(container, "warning", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.textContent = "Publish";
  }
}
