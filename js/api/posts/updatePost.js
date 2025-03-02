import { BASE_URL, ENDPOINTS } from "../../api/endpoints.js";
import { API_KEY } from "../../api/config.js";
import { getToken } from "../../auth/storage.js";

export async function updatePost(id, post) {
  const url = `${BASE_URL}${ENDPOINTS.updatePost}${id}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(post),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message || "Failed to create post");
  }

  return await response.json();
}
