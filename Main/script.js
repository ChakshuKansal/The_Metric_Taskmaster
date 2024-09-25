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
  dashboard.innerHTML = ''; // Clear any existing tasks

  tasks.forEach((task, index) => {
    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box');
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'task-completed';
    radioButton.checked = task.completed;
    radioButton.addEventListener('click', () => markTaskAsCompleted(index)); //Event to mark task completed
    const taskLabel = document.createElement('span');
    taskLabel.innerText = task.title;
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
  tasks.splice(taskIndex, 1);
  localStorage.setItem(currentUser, JSON.stringify(userData));
  displayTasks();
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
      taskDetails.innerHTML = `<h2>Tasks</h2><br><h3>${task.title}</h3><p>${task.description}</p>`;
  }
}

createtask.addEventListener("click", () => {
  taskinput.style.display = "grid";
});

xmark.addEventListener("click", () => {
  taskinput.style.display = "none";
});


// ************************************************************************Clock

let hrs=document.getElementById("hrs");
let mins=document.getElementById("mins");
let secs=document.getElementById("secs");


setInterval(()=>{
  let currenttime=new Date();

hrs.innerHTML=currenttime.getHours();
mins.innerHTML=currenttime.getMinutes();
secs.innerHTML=currenttime.getSeconds();
},1000);
