// Store tasks in an array
let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task !== "") {
    const newTask = {
      id: Date.now(),
      name: task,
      completed: false,
      timestamp: new Date()
    };

    tasks.push(newTask);
    updateTasks();
    taskInput.value = "";
  }
}

// Function to update the task lists
function updateTasks() {
  const pendingTasksList = document.getElementById("pendingTasks");
  const completedTasksList = document.getElementById("completedTasks");

  // Clear the existing lists
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  // Loop through the tasks array and add tasks to the appropriate list
  tasks.forEach(task => {
    const listItem = document.createElement("li");
    listItem.dataset.id = task.id;

    const taskName = document.createElement("span");
    taskName.textContent = task.name;
    listItem.appendChild(taskName);

    const timestamp = document.createElement("span");
    timestamp.textContent = formatDate(task.timestamp);
    listItem.appendChild(timestamp);

    if (task.completed) {
      listItem.classList.add("completed");
      completedTasksList.appendChild(listItem);
    } else {
      const completeButton = createButton("Complete", () => markTaskAsComplete(task.id));
      const editButton = createButton("Edit", () => editTask(task.id));
      const deleteButton = createButton("Delete", () => deleteTask(task.id));

      listItem.appendChild(completeButton);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      pendingTasksList.appendChild(listItem);
    }
  });
}

// Function to create a button element
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

// Function to mark a task as complete
function markTaskAsComplete(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = true;
    updateTasks();
  }
}

// Function to edit a task
function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    const newTaskName = prompt("Enter the new task name:", task.name);
    if (newTaskName !== null && newTaskName.trim() !== "") {
      task.name = newTaskName.trim();
      updateTasks();
    }
  }
}

// Function to delete a task
function deleteTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    updateTasks();
  }
}

// Function to format the date and time
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  return date.toLocaleString("en-US", options);
}
