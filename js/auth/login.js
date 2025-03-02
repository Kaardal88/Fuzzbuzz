import { BASE_URL, ENDPOINTS } from "../api/endpoints.js";
import { getToken } from "./storage.js";
import { API_KEY } from "../api/config.js";

/**
 * This code sends a login request to the Noroff API with the provided credentials.
 * It uses an API key and TOKEN for authentication.
 * Thwors an error if the login request fails.
 * @async - code is async, so I use await fetch response.
 * @function login
 * @param {Object} data - The login values/inputs. Email and password.
 * @returns {Promise} - The response data (object) if login is a success.
 * @throws {error} - If something went wrong with the login request, it throws an error.
 */

export async function login(data) {
  const url = `${BASE_URL}${ENDPOINTS.login}`;

  const token = getToken();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  const responseBody = await response.json();
  console.log(responseBody);
  return responseBody;
}
