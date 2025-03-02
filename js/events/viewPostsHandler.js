import { getPosts } from "../api/posts/getPosts.js";
import { renderPosts } from "../ui/posts/renderPosts.js";
import { displayMessage } from "../utils/displayMessage.js";
import filterPostsHandler from "./filterPostsHandler.js";

export function viewPostsHandler() {
  const container = document.querySelector("#content-container");

  async function loadAllPosts() {
    try {
      const json = await getPosts();
      const posts = json.data;
      renderPosts(container, posts);
      filterPostsHandler(container, posts);
    } catch (error) {
      console.error(error);
      displayMessage(container, "warning", error.message);
    }
  }

  loadAllPosts();
}
