export function renderSinglePost(container, post) {
  const { title, body, media, created } = post;
  const imageUrl = media?.url || "";

  container.innerHTML = `
      <div class="bg-gray-600 dark:bg-gray-100 p-6 rounded-lg shadow break-words">
      ${
          imageUrl
            ? `<img class="w-full rounded-lg " src="${imageUrl}" alt="${title}">`
            : ""
        }
        <h1 class="text-white text-2xl font-bold dark:text-black">${title}</h1>
        <p class="text-white dark:text-black mt-4">${body}</p>
        <p class="text-gray-400 text-xs font-light italic dark:text-gray-500 mt-2">Published: ${new Date(
          created
        ).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short",
        })}</p>
        
      </div>
    `;
}
