import { getSinglePost } from "../api/posts/getSinglePost.js";
import populateEditForm from "../ui/posts/populateEditForm.js";
import { updatePostHandler } from "./updatePostHandler.js";

export default async function editPostHandler() {
  const messageCcontainer = document.querySelector("#message");

  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    displayMessage(messageCcontainer, "warning", "Post ID not found.");
    return;
  }

  try {
    const json = await getSinglePost(postId);
    const post = json.data;
    populateEditForm(post);
    updatePostHandler();
  } catch (error) {
    console.error(error);
    displayMessage(messageCcontainer, "warning", error.message);
  }
}
