const logoutButton = document.querySelector("#logout");

export function logOut() {
  // Fjern tokens fra localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");

  // Naviger brukeren til innloggingssiden eller forsiden
  window.location.href = "/index.html";
  history.replaceState(null, "", "/index.html");

  console.log("User logged out locally.");
}

export function logoutListener() {
  document.addEventListener("click", function (event) {
    if (event.target.closest("#logout")) {
      logOut();
    }
  });
}
