import { BASE_URL, ENDPOINTS } from "../../api/endpoints.js";
import { API_KEY } from "../../api/config.js";
import { getToken } from "../../auth/storage.js";

export async function deletePost(id) {
  const url = `${BASE_URL}${ENDPOINTS.deletePost.replace("{id}", id)}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  const response = await fetch(url, options);

  console.log(`Response status: ${response.status}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to delete post");
  }

  if (response.status === 204) {
    return { success: true };
  }

  return await response.json();
}
