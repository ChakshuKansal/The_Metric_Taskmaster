// JavaScript for Main Page
function displayUsername() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    document.getElementById("usernameDisplay").textContent = currentUser;
  }
}

// Call this function when the page loads
window.onload = displayUsername;

window.onload=updateAnalytics;

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

// Function to display tasks on the dashboard
function displayTasks() {
  // Get the logged-in user
  const currentUser = localStorage.getItem("currentUser");
  // Check if the user is logged in
  if (!currentUser) {
    alert("No user is logged in.");
    return;
  }
  // Get the user's data from localStorage (including password, email, and tasks)
  const userData = JSON.parse(localStorage.getItem(currentUser));
  // Check if user has any tasks, if not, initialize an empty array
  let tasks = userData.tasks || [];
  const dashboard = document.getElementById('task-dashboard');
  const taskContainer = document.getElementById('tasks-cont'); 
  dashboard.innerHTML = ''; // Clear any existing tasks
  console.log(tasks.length);

  if (tasks.length === 0) {
    taskContainer.style.display = 'none';
    return; 
  } else {
    taskContainer.style.display = 'flex';
  }

  tasks.forEach((task, index) => {
    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box');
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'task-completed';
    radioButton.checked = task.completed;
    radioButton.addEventListener('click', () => markTaskAsCompleted(index)); //Event to mark task completed
    const taskLabel = document.createElement('span');
    taskLabel.innerText = `<h1>${formatDescription(task.title)}</h1>`;
    taskLabel.style.textDecoration = task.completed ? 'line-through' : 'none'; //Strike-through if completed
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-xl" style="color: #74C0FC;"></i>';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent triggering other events (like opening the task)
      deleteTask(index);
    });

    taskBox.appendChild(radioButton);
    taskBox.appendChild(taskLabel);  
    taskBox.appendChild(deleteButton); 
    taskBox.addEventListener('click', () => openTask(task.id));
    dashboard.appendChild(taskBox);
  });
}

function deleteTask(taskIndex) {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    alert("No user is logged in.");
    return;
  }

  const userData = JSON.parse(localStorage.getItem(currentUser));
  let tasks = userData.tasks || [];
  tasks.splice(taskIndex, 1); // Remove the task at the given index
  userData.tasks = tasks; // Update the userData object
  localStorage.setItem(currentUser, JSON.stringify(userData)); // Save the updated user data

  displayTasks();
  updateAnalytics()
}


//Function to mark a task as completed**
function markTaskAsCompleted(taskIndex) {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    alert("No user is logged in.");
    return;
  }

  const userData = JSON.parse(localStorage.getItem(currentUser));
  let tasks = userData.tasks || [];
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  localStorage.setItem(currentUser, JSON.stringify(userData));

  displayTasks();

  // Update analytics after task completion
  updateAnalytics();
}


function submitdata() {
  const headinput = document.getElementById("headinput").value;
  const desc = document.getElementById("taskinputbox").value;

  if (headinput === "" || desc === "") {
    alert("Please fill in both fields.");
    return;
  }

  // Get the logged-in user
  const currentUser = localStorage.getItem("currentUser");

   // Retrieve the user object (password, email, tasks)
   let userData = JSON.parse(localStorage.getItem(currentUser));

   // If the user object doesn't have tasks, initialize an empty array
   if (!userData.tasks) {
     userData.tasks = [];
   }

  const newTask = {
    id: userData.tasks.length + 1,
    title: headinput,
    description: desc
  };

    userData.tasks.push(newTask);
    localStorage.setItem(currentUser, JSON.stringify(userData));
    document.getElementById("headinput").value = '';
    document.getElementById("taskinputbox").value = '';

    // Refresh the task dashboard
  displayTasks();
  updateAnalytics();
}

displayTasks()

// Function to get tasks from localStorage
function getTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Function to open a task and show details
function openTask(taskId) {
  const currentUser = localStorage.getItem("currentUser");
    // Get the user's data from localStorage
    const userData = JSON.parse(localStorage.getItem(currentUser));
   // Get the task list from user data
   const tasks = userData.tasks || [];
   const task = tasks.find(t => t.id === taskId);
  if (task) {
      const taskDetails = document.getElementById('task-details');
      taskDetails.style.display = 'block';

     taskDetails.innerHTML = `
      <br>
      <h3>${formatDescription(task.title)}</h3>
      <div class="task-desc">
        ${formatDescription(task.description)}
      </div>`;
  }
}
// Function to format the description into multiple lines
function formatDescription(description) {
  const lineLength = 18; // Number of characters per line
  let formattedDescription = '';
  
  for (let i = 0; i < description.length; i += lineLength) {
    formattedDescription += description.slice(i, i + lineLength) + '<br>';
  }
  
  return formattedDescription;
}

createtask.addEventListener("click", () => {
  taskinput.style.display = "grid";
});

xmark.addEventListener("click", () => {
  taskinput.style.display = "none";
});

//*************************************************************************Analytics */

function updateAnalytics() {
  const currentUser = localStorage.getItem("currentUser");
  const userData = JSON.parse(localStorage.getItem(currentUser)) || { tasks: [] };
  const tasks = userData.tasks || [];

  // Count various task categories
  const tasksDone = tasks.filter(task => task.completed).length;
  const projectsTotal = tasks.length;
  const inProgress = tasks.filter(task => !task.completed).length;

  // Update the DOM with the new counts
  document.getElementById('tasks-done').innerText = tasksDone;
  document.getElementById('projects-total').innerText = projectsTotal;
  document.getElementById('projects-in-progress').innerText = inProgress;
  document.getElementById('projects-completed').innerText = tasksDone;
}

function shareAnalytics() {
  const tasksDone = document.getElementById('tasks-done').innerText;
  const projectsTotal = document.getElementById('projects-total').innerText;
  const projectsInProgress = document.getElementById('projects-in-progress').innerText;
  const projectsCompleted = document.getElementById('projects-completed').innerText;

  const shareData = {
    title: 'My Task Analytics',
    text: `Here are my current task analytics:\n- Tasks Done: ${tasksDone}\n- Total Projects: ${projectsTotal}\n- Projects In Progress: ${projectsInProgress}\n- Projects Completed: ${projectsCompleted}`,
    url: window.location.href // Current page URL for context
  };

  // ONLY if the Web Share API is supported
  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Share successful!'))
      .catch((error) => console.log('Error sharing:', error));
  } else {
    alert('Share feature is not supported in your browser.');
  }
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.fa-ellipsis-vertical')) {
    const dropdown = document.getElementById("dropdown");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    }
  }
}

function resetAnalytics() {
  const currentUser = localStorage.getItem("currentUser");

  // Check if a user is logged in
  if (!currentUser) {
    alert("No user is logged in.");
    return;
  }

  // Retrieve the user data from local storage
  const userData = JSON.parse(localStorage.getItem(currentUser));

  // Reset tasks to an empty array
  userData.tasks = [];

  // Update the local storage with the reset user data
  localStorage.setItem(currentUser, JSON.stringify(userData));

  // Reset displayed analytics counts
  document.getElementById('tasks-done').innerText = '0';
  document.getElementById('projects-total').innerText = '0';
  document.getElementById('projects-in-progress').innerText = '0';
  document.getElementById('projects-completed').innerText = '0';

  // Optionally alert the user
  alert("Analytics have been reset.");
  updateAnalytics();
  displayTasks()
}



// ************************************************************************Clock

let hrs=document.getElementById("hrs");
let mins=document.getElementById("mins");
let secs=document.getElementById("secs");


// setInterval(()=>{
//   let currenttime=new Date();

// hrs.innerHTML=currenttime.getHours();
// mins.innerHTML=currenttime.getMinutes();
// secs.innerHTML=currenttime.getSeconds();
// },1000);


// /////////////////////////////////////////////////////////////////////////Weather

const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}