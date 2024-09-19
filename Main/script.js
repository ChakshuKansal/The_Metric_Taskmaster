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

function openCalender() {
  window.location.href = "../Calender/Calender.html";
}

let createtask = document.getElementById("createtask");
let taskinput = document.getElementById("taskinput");
let xmark = document.getElementById("Xmark");

function submitdata() {
  const headinput = document.getElementById("headinput").value;
  const desc = document.getElementById("taskinputbox").value;
  localStorage.setItem(headinput, desc);
}

createtask.addEventListener("click", () => {
  taskinput.style.right = 0;
});

xmark.addEventListener("click", () => {
  taskinput.style.right = "-20%";
});
