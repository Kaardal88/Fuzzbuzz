import { deletePostHandler } from "../../events/deletePostHandler.js";
import { getName } from "../../auth/storage.js";

export function renderPersonalPosts(container, posts) {
  container.innerHTML = "";

  posts.forEach((post) => {
    const { title, id, body, media, created } = post;
    const imageUrl = media?.url || "";

    let authorName = getName();

    if (!authorName) {
      authorName = "Unknown";
    }

    const postUrl = `/post-detail/index.html?id=${id}`;

    const postElement = document.createElement("div");
    postElement.className =
      "bg-gray-600 dark:bg-gray-100 p-4 rounded-lg shadow break-words post";

    postElement.innerHTML = `
      <a href="${postUrl}" class="flex flex-col space-y-4">
      ${
          imageUrl
            ? `<img class="w-fit h-auto mx-auto rounded-lg" src="${imageUrl}" alt="${title}">`
            : ""
        }
        <h1 class="text-white text-lg font-semibold dark:text-black">${title}</h1>
        <h2 class="text-white text-sm font-semibold dark:text-black">By: ${authorName}</h2>
        <p class="text-white dark:text-black text-sm">${body}</p>
        <p class="text-gray-400 text-xs font-light italic dark:text-gray-500">Published: ${new Date(
          created
        ).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short",
        })}</p>
        
      </a>
      <div class="flex items-center gap-2 pt-4">
        <a href="${`/edit-post/index.html?id=${id}`}" class="px-4 py-1.5 rounded-full text-sm font-medium text-white dark:text-black ring-1 ring-gray-400 hover:ring-white dark:hover:ring-black transition">Edit</a>
        <button data-id="${id}" class="delete-post px-4 py-1.5 rounded-full text-sm font-medium text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black transition">Delete</button>
      </div>
    `;

    container.appendChild(postElement);
  });

  const deleteButtons = container.querySelectorAll(".delete-post");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const shouldDelete = confirm(
        "Are you sure you want to delete this post?"
      );

      if (shouldDelete) {
        const button = event.target;
        const postContainer = button.closest(".post");
        const id = event.target.getAttribute("data-id");
        deletePostHandler(id);
        postContainer.remove();
      }
    });
  });
}
