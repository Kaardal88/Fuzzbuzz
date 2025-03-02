import { BASE_URL, ENDPOINTS } from "../endpoints.js";
import { API_KEY } from "../config.js";
import { getToken, getName } from "../../auth/storage.js";

export async function getPersonalPosts() {
  const name = getName("username");

  const url = `${BASE_URL}${ENDPOINTS.getPersonalPosts}/${name}/posts?_author=true`;
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
