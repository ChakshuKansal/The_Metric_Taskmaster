let x = document.getElementById("btn1");
let signup = document.getElementById("signup");
let signin = document.getElementById("signin");
let btn1 = document.getElementById("signinbtn");
let btn2 = document.getElementById("signupbtn");
let cont1 = document.getElementById("cont1");
let cont2 = document.getElementById("cont2");

let SU = document.getElementById("SU");
let SI = document.getElementById("SI");

let flag = 0;

function transform1() {
  console.log("Helo");
  if (flag == 0) {
    signup.style.transform = "translateX(-100%)";
    signin.style.transform = "translateX(100%)";
    SU.style.display = "block";
    SI.style.display = "none";
    btn1.style.display = "block";
    btn2.style.display = "none";
    cont1.style.display = "block";
    cont2.style.display = "none";
    flag = 1;
  } else {
    signin.style.transform = "translateX(0%)";
    signup.style.transform = "translateX(0%)";
    SU.style.display = "none";
    SI.style.display = "block";
    btn1.style.display = "none";
    btn2.style.display = "block";
    cont1.style.display = "none";
    cont2.style.display = "block";
    flag = 0;
  }
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (username && password) {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      alert("Login successful!");
      // Redirect to the to-do list page or dashboard
      localStorage.setItem("currentUser", username);
      window.location.href = "../Main/index.html";
    } else {
      alert("Invalid username or password.");
    }
  } else {
    alert("Please enter both username and password.");
  }
}

// Sign Up Function
function signUp() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const email = document.getElementById("signupEmail").value;

  if (username && password && email) {
    // Check if the user already exists
    if (localStorage.getItem(username)) {
      alert("Username already exists!");
    } else {
      // Store user data in local storage
      localStorage.setItem(username, JSON.stringify({ password, email }));

      // Update the list of all users
      let users = JSON.parse(localStorage.getItem("usersList")) || [];
      users.push(username);
      localStorage.setItem("usersList", JSON.stringify(users));

      alert("User registered successfully!");
    }
  } else {
    alert("Please enter both username and password.");
  }
}
