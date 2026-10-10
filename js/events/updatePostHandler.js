import { updatePost } from "../api/posts/updatePost.js";
import { displayMessage } from "../utils/displayMessage.js";

export async function updatePostHandler() {
  const form = document.querySelector("#editPostForm");
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const id = data.id;

  const post = {
    title: data.title,
    body: data.body,
    tags: data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== ""),
  };

  if (data.mediaUrl.trim() !== "") {
    post.media = {};
    post.media.url = data.mediaUrl;
    post.media.alt = data.mediaAlt;
  }

  const fieldset = form.querySelector("fieldset") || form;
  const submitButton = form.querySelector("#confettiButton");
  const container = document.querySelector("#message");

  try {
    fieldset.disabled = true;
    submitButton.textContent = "Publishing...";
    await updatePost(id, post);
    displayMessage(container, "success", "Post updated");
    setTimeout(() => {
      window.location.href = "/profile/index.html";
    }, 1000);
  } catch (error) {
    console.error("Error updating post:", error.message);
    displayMessage(container, "warning", error.message);
    fieldset.disabled = false;
    submitButton.textContent = "Publish";
  }
}
