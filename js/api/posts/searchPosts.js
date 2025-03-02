import { BASE_URL, ENDPOINTS } from "../endpoints.js";
import { API_KEY } from "../config.js";
import { getToken } from "../../auth/storage.js";

export async function searchPosts(query) {
  const url = `${BASE_URL}${ENDPOINTS.searchPosts}${query}`;

  const token = getToken();

  if (!token) {
    throw new Error("No token");
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message || "Get failed");
  }

  return await response.json();
}
