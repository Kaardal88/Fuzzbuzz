import { getPosts } from "../api/posts/getPosts.js";
import { renderPosts } from "../ui/posts/renderPosts.js";
import { displayMessage } from "../utils/displayMessage.js";
import filterPostsHandler from "./filterPostsHandler.js";

export function viewPostsHandler() {
  const myTagButton = document.querySelector("#myTag");
  const container = document.querySelector("#content-container");
  const myTag = "myPersonalStuff";

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

  /*  myTagButton.addEventListener("click", async () => {
    try {
      const json = await getPosts(tags);
      const posts = json.data;

      renderPosts(container, posts);

      if (posts.length === 0) {
        container.innerHTML = "<p>No posts found with your personal tag.</p>";
      }
    } catch (error) {
      console.error(error);
      displayMessage(container, "warning", error.message);
    }
  });
 */

  loadAllPosts();
}
