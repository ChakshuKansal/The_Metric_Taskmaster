// JavaScript for Main Page
function displayUsername() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    document.getElementById("usernameDisplay").textContent = currentUser;
  }
}

// Call this function when the page loads
window.onload = displayUsername;

function logout() {
  localStorage.removeItem("currentUser");
  // Redirect to the login page
  window.location.href = "../Login/login.html";
}

function openDashboard() {
  // Redirect to the dashboard page
  window.location.href = "../Dashboard/dashboard.html";
}

function openCalender() {
  // window.location.href="../Calender/Calender.html";
  window.location.href = "../Calender/Calender.html";
}

function displayRegisteredUsers() {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];

  const usersListElement = document.getElementById("usersList");
  usersListElement.innerHTML = ""; // Clear the list first

  usersList.forEach((username) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-item");
    userDiv.textContent = username;
    usersListElement.appendChild(userDiv);
  });
}

// Function to load a page into the main content area
function loadPage(page) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-content").innerHTML = data;

      if (page.includes("dashboard.html")) {
        displayRegisteredUsers();
      }
    })
    .catch((error) => {
      console.error("Error loading page:", error);
      document.getElementById("main-content").innerHTML =
        "<p>Error loading page.</p>";
    });
}
