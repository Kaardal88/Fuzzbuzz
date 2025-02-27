import { getSinglePost } from "../api/posts/getSinglePost.js";
import { renderSinglePost } from "../ui/posts/renderSinglePost.js";
import { displayMessage } from "../utils/displayMessage.js";

export async function viewSinglePostHandler() {
  const container = document.querySelector("#single-post-container");

  // Henter ID fra URL
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
