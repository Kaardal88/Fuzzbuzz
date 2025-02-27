const TOKEN = "token";

export function save(key, value) {
  let valueToStore = value;

  if (typeof value !== "string") {
    valueToStore = JSON.stringify(value);
  }

  localStorage.setItem(key, valueToStore);
}

export function load(key) {
  const value = localStorage.getItem(key);

  try {
    return JSON.parse(value);
  } catch {
    return value; // Returnerer verdien som en streng hvis JSON.parse feiler
  }
}

export function remove(TOKEN) {
  localStorage.removeItem(TOKEN);
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  const token = localStorage.getItem("token");
  console.log("Henter token:", token);
  return token;
}

export function getName() {
  return load("username");
}

export function getUserID() {
  return load("userID"); // Henter brukerens ID fra localStorage
}
