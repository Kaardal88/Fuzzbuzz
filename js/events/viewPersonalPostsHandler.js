import { getPersonalPosts } from "../api/posts/getPersonalPosts.js";
import { renderPersonalPosts } from "../ui/posts/renderPersonalPosts.js";

export async function viewPersonalPostsHandler() {
  const container = document.querySelector("#personal-posts");

  try {
    const json = await getPersonalPosts();

    const posts = json.data;

    renderPersonalPosts(container, posts);
  } catch (error) {
    console.error("Feil ved henting av personlige innlegg:", error);
  }
}
