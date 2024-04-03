export function toggleNav() {
  const navSidebar = document.querySelector(".nav_sidebar");
  navSidebar.classList.toggle("show");
}

export function logoutUser() {
  document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("prLogout");
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      window.location.href = "../LoginForm/index.html";
    });
  });
}

export function loggedInUserInfo() {
  document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("loggedInUser"));

    const userNameElement = document.querySelector(".userName");
    const userEmailElement = document.querySelector(".userEmail");
    const userNameElement1 = document.querySelector(".userName1");
    const userEmailElement2 = document.querySelector(".userEmail2");

    userNameElement.textContent = users.name;
    userEmailElement.textContent = users.email;
    userNameElement1.textContent = users.name;
    userEmailElement2.textContent = users.email;
  });
}
