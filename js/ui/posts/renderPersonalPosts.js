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
      "bg-gray-600 dark:bg-gray-100 p-4 rounded-lg shadow post";

    postElement.innerHTML = `
      <a href="${postUrl}"><div class="flex flex-col space-y-4">
        <h1 class="text-white text-lg font-semibold dark:text-black">${title}</h1>
        <h2 class="text-white text-sm font-semibold dark:text-black">Av: ${authorName}</h2>
        <p class="text-white dark:text-black text-sm">${body}</p>
        <p class="text-white text-sm font-light italic dark:text-black">Publisert: ${new Date(
          created
        ).toLocaleDateString()}</p>
        ${
          imageUrl
            ? `<img class="w-fit h-auto mx-auto rounded-lg" src="${imageUrl}" alt="${title}"></a>`
            : ""
        }
        <div class="flex justify-between pt-2">
        
        </div>
        <div>
            <a href="${`/edit-post/index.html?id=${id}`}" class="bg-blue-500 px-4 py-2 rounded-md font-semibold text-sm">Edit</a>
            <button data-id="${id}" class="delete-post bg-red-500 px-4 py-2 rounded-md font-semibold text-sm">Delete</button>
          </div>
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
