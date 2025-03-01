import { deletePostHandler } from "../../events/deletePostHandler.js";

export function renderPosts(container, posts) {
  container.innerHTML = "";

  posts.forEach((post) => {
    const { title, id, body, media, created } = post;
    const imageUrl = media?.url || "";

    const postUrl = `/post-detail/index.html?id=${id}`;

    const postElement = document.createElement("div");
    postElement.className =
      "bg-gray-600 dark:bg-gray-100 p-4 rounded-lg shadow";

    postElement.innerHTML = `
    <a href="${postUrl}">  
    <div class="flex flex-col space-y-4">
        <h1 class="text-white text-lg font-semibold dark:text-black">${title}</h1>
        
        <p class="text-white dark:text-black text-sm">${body}</p>
        <p class="text-white text-sm font-light italic dark:text-black">Published: ${created}</p>
        ${
          imageUrl
            ? `<img class="w-full rounded-lg" src="${imageUrl}" alt="${title}">`
            : ""
        }
        
      </div>
      </a>
    `;

    container.appendChild(postElement);
  });

  container.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-post")) {
      const id = event.target.getAttribute("data-id");
      deletePostHandler(id);
    }
  });
}
