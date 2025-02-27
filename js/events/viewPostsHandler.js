import { getPosts } from "../api/posts/getPosts.js";
import { renderPosts } from "../ui/posts/renderPosts.js";
import { displayMessage } from "../utils/displayMessage.js";

export async function viewPostsHandler() {
  const container = document.querySelector("#content-container");
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");

  try {
    const json = await getPosts();
    const posts = json.data;
    console.log(posts);
    renderPosts(container, posts);

    searchButton.addEventListener("click", (event) => {
      event.preventDefault();

      const searchValue = searchInput.value.trim().toLowerCase();

      const filteredPosts = posts.filter((post) => {
        const title = post.title?.toLowerCase() || "";
        return title.includes(searchValue);
      });

      renderPosts(container, filteredPosts);

      if (filteredPosts.length === 0) {
        container.innerHTML = "<p>No posts found.</p>";
      }
    });
  } catch (error) {
    console.error(error);
    displayMessage(container, "warning", error.message);
  } finally {
    //window.addEventListener("scroll", Infinity);
  }
}
