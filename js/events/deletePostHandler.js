import { deletePost } from "../api/posts/deletePost.js";

export async function deletePostHandler(id) {
  try {
    const deleteButton = document.querySelectorAll(`[data-id="${id}"]`);
    if (!deleteButton) {
      throw new Error("Delete button not found");
    }

    deleteButton.textContent = "Deleting...";
    await deletePost(id);

    window.location.href = "/feed/index.html";
  } catch (error) {
    console.error("Error deleting post:", error.message);
  }
}
