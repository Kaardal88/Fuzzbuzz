import { searchPosts } from "../api/posts/searchPosts.js";
import { register } from "../auth/register.js";
import { renderPosts } from "../ui/posts/renderPosts.js";
import { displayMessage } from "../utils/displayMessage.js";
import { viewPostsHandler } from "../events/viewPostsHandler.js";

export function searchPostsHandler() {
  const searchButton = document.querySelector("#search-button");
  if (searchButton) {
    searchButton.addEventListener("click", handleSearch);
  }
}

async function handleSearch(event) {
  const searchInput = document.querySelector("#search-input");
  const searchValue = searchInput.value;

  if (searchValue.trim() === "") {
    return;
  }

  const container = document.querySelector("#content-container");
  const removeSearchButton = document.querySelector("#remove-search");

  try {
    const response = await searchPosts(searchValue);
    removeSearchButton.style.display = "block";
    renderPosts(container, response.data);

    if (removeSearchButton) {
      removeSearchButton.addEventListener("click", () => {
        viewPostsHandler();
        removeSearchButton.style.display = "none";
        searchInput.value = "";
      });
    }
  } catch (error) {
    console.error(error);
  }
}
