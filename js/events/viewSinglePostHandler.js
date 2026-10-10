import { getSinglePost } from "../api/posts/getSinglePost.js";
import { renderSinglePost } from "../ui/posts/renderSinglePost.js";
import { displayMessage } from "../utils/displayMessage.js";

export async function viewSinglePostHandler() {
  const container = document.querySelector("#single-post-container");

  const backButton = document.getElementById("backToLastLocationButton");

  backButton.addEventListener("click", function () {
    if (document.referrer.includes("/feed/")) {
      window.location.href = "/feed/index.html";
    } else if (document.referrer.includes("/profile/")) {
      window.location.href = "/profile/index.html";
    } else {
      window.history.back();
    }
  });

  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    displayMessage(container, "warning", "Post ID not found.");
    return;
  }

  try {
    const json = await getSinglePost(postId);
    const post = json.data;
    renderSinglePost(container, post);
  } catch (error) {
    console.error(error);
    displayMessage(container, "warning", error.message);
  }
}
