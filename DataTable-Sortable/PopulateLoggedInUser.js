// UserInterface class responsible for managing user interface interactions
export class UserInterface {
  constructor() {
    // Initialize the user interface by setting up event listeners
    this.setupEventListeners();
  }

  // Method to toggle navigation sidebar
  toggleNav() {
    const navSidebar = document.querySelector(".nav_sidebar");
    navSidebar.classList.toggle("show");
  }

  // Method to log out the user
  logoutUser() {
    // Get the logout button element
    const logoutButton = document.getElementById("prLogout");
    // Add event listener to handle logout action
    logoutButton.addEventListener("click", () => {
      // Remove user data from local storage
      localStorage.removeItem("loggedInUser");
      // Redirect to login page
      window.location.href = "../LoginForm/index.html";
    });
  }

  // Method to display logged-in user information
  loggedInUserInfo() {
    // Retrieve user data from local storage
    const users = JSON.parse(localStorage.getItem("loggedInUser"));
    // Get elements to display user information
    const userNameElement = document.querySelector(".userName");
    const userEmailElement = document.querySelector(".userEmail");
    const userNameElement1 = document.querySelector(".userName1");
    const userEmailElement2 = document.querySelector(".userEmail2");

    // Set user name and email in respective elements
    userNameElement.textContent = users.name;
    userEmailElement.textContent = users.email;
    userNameElement1.textContent = users.name;
    userEmailElement2.textContent = users.email;
  }

  // Method to set up event listeners
  setupEventListeners() {
    // When the DOM content is loaded, initialize user info and logout functionality
    document.addEventListener("DOMContentLoaded", () => {
      this.logoutUser();
      this.loggedInUserInfo();
    });

    // Event listener to toggle navigation sidebar when toggle button is clicked
    document.getElementById("toggleNav").addEventListener("click", () => {
      this.toggleNav();
    });

    // Event listener to close navigation sidebar when close button is clicked
    document.getElementById("closeToggle").addEventListener("click", () => {
      this.toggleNav();
    });
  }
}
