// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const totalTasksSpan = document.getElementById("totalTasks");
const completedTasksSpan = document.getElementById("completedTasks");

// Task counters
let taskCount = 0;
let completedCount = 0;

function updateTaskStats() {
  totalTasksSpan.textContent = `Total tasks: ${taskCount}`;
  completedTasksSpan.textContent = `Completed: ${completedCount}`;
}

// Function to create a new task item
function createTaskItem(taskText) {
  const li = document.createElement("li");
  li.className = "task-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "complete-checkbox";

  const taskTextSpan = document.createElement("span");
  taskTextSpan.className = "task-text";
  taskTextSpan.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  // Add event listeners
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.classList.add("completed");
      completedCount++;
    } else {
      li.classList.remove("completed");
      completedCount--;
    }
    updateTaskStats();
  });

  deleteButton.addEventListener("click", () => {
    li.remove();
    taskCount--;
    if (checkbox.checked) {
      completedCount--;
    }
    updateTaskStats();

    // Show empty list message if no tasks remain
    if (taskCount === 0) {
      showEmptyMessage();
    }
  });

  li.appendChild(checkbox);
  li.appendChild(taskTextSpan);
  li.appendChild(deleteButton);

  return li;
}

// Function to show empty list message
function showEmptyMessage() {
  const emptyMessage = document.createElement("li");
  emptyMessage.className = "empty-list";
  emptyMessage.textContent = "No tasks yet. Add one above!";
  taskList.innerHTML = "";
  taskList.appendChild(emptyMessage);
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  // Remove empty list message if it exists
  if (taskCount === 0) {
    taskList.innerHTML = "";
  }

  // Create and add new task
  const taskItem = createTaskItem(taskText);
  taskList.appendChild(taskItem);

  // Update counters and UI
  taskCount++;
  updateTaskStats();

  // Clear input
  taskInput.value = "";
}

// Event listeners
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Initialize empty list message and stats
showEmptyMessage();
updateTaskStats();
