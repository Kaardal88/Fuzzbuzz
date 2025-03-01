import { getSinglePost } from "../api/posts/getSinglePost.js";
import populateEditForm from "../ui/posts/populateEditForm.js";
import { updatePostHandler } from "./updatePostHandler.js";

export default async function editPostHandler() {
  const messageCcontainer = document.querySelector("#message");

  // get the id from the URL
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    displayMessage(messageCcontainer, "warning", "Post ID not found.");
    return;
  }

  // fetch the post by id
  try {
    const json = await getSinglePost(postId);
    const post = json.data;
    console.log(post);
    populateEditForm(post);
    updatePostHandler();
  } catch (error) {
    console.error(error);
    displayMessage(messageCcontainer, "warning", error.message);
  }

  // populate the form with the post data
  // listen for form submission
  // update the post
}
