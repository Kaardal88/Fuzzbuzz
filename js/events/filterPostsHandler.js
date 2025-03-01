import { renderPosts } from "../ui/posts/renderPosts.js";

export default function filterPostsHandler(container, posts) {
  const filterInput = document.querySelector("#filter-input");

  filterInput.addEventListener("input", function () {
    const tag = filterInput.value.trim().toLowerCase();

    if (tag === "") {
      renderPosts(container, posts);
      return;
    }

    const filteredPosts = posts.filter((post) =>
      post.tags.some((postTag) => postTag.startsWith(tag))
    );
    renderPosts(container, filteredPosts);
  });
}
