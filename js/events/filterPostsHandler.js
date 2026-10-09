import { renderPosts } from "../ui/posts/renderPosts.js";

let currentContainer;
let currentPosts = [];
let listenerAdded = false;

export default function filterPostsHandler(container, posts) {
  const filterInput = document.querySelector("#filter-input");
  if (!filterInput) {
    return;
  }

  currentContainer = container;
  currentPosts = posts;
  filterInput.value = "";

  if (listenerAdded) {
    return;
  }
  listenerAdded = true;

  filterInput.addEventListener("input", function () {
    const tag = filterInput.value.trim().toLowerCase();

    if (tag === "") {
      renderPosts(currentContainer, currentPosts);
      return;
    }

    const filteredPosts = currentPosts.filter((post) =>
      (post.tags || []).some((postTag) =>
        postTag.trim().toLowerCase().startsWith(tag)
      )
    );
    renderPosts(currentContainer, filteredPosts);
  });
}
