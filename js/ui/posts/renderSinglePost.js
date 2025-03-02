export function renderSinglePost(container, post) {
  const { title, body, media, created } = post;
  const imageUrl = media?.url || "";

  container.innerHTML = `
      <div class="bg-gray-600 dark:bg-gray-100 p-6 rounded-lg shadow">
        <h1 class="text-white text-2xl font-bold dark:text-black">${title}</h1>
        <p class="text-white dark:text-black mt-4">${body}</p>
        <p class="text-white text-sm font-light italic dark:text-black mt-2">Published: ${created}</p>
        ${
          imageUrl
            ? `<img class="w-full rounded-lg mt-4" src="${imageUrl}" alt="${title}">`
            : ""
        }
      </div>
    `;
}
