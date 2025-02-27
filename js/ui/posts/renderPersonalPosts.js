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

    const postElement = document.createElement("div");
    postElement.className =
      "bg-gray-600 dark:bg-gray-100 p-4 rounded-lg shadow";

    postElement.innerHTML = `
      <div class="flex flex-col space-y-4">
        <h1 class="text-white text-lg font-semibold dark:text-black">${title}</h1>
        <h2 class="text-white text-sm font-semibold dark:text-black">Av: ${authorName}</h2>
        <p class="text-white dark:text-black text-sm">${body}</p>
        <p class="text-white text-sm font-light italic dark:text-black">Publisert: ${new Date(
          created
        ).toLocaleDateString()}</p>
        ${
          imageUrl
            ? `<img class="w-full rounded-lg" src="${imageUrl}" alt="${title}">`
            : ""
        }
        <div class="flex justify-between pt-2">
        
          <div>
            <button data-id="${id}" class="edit-post bg-blue-500 px-4 py-2 rounded-md font-semibold text-sm">Edit</button>
            <button data-id="${id}" class="delete-post bg-red-500 px-4 py-2 rounded-md font-semibold text-sm">Delete</button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(postElement);
  });

  // Event delegation for delete og edit
  container.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-post")) {
      const id = event.target.getAttribute("data-id");
      deletePostHandler(id);
    }
    if (event.target.classList.contains("edit-post")) {
      const id = event.target.getAttribute("data-id");
      location.href = `/edit-post.html?id=${id}`;
    }
  });
}
