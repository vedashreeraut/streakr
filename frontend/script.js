const API = "http://127.0.0.1:3001/tasks";

function loadTasks() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";
      data.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${task.title}</span>
          <button class="delete-btn" onclick="deleteTask('${task._id}')">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
            Delete
          </button>
        `;
        list.appendChild(li);
      });
      // Re-run Lucide to render the new trash icons
      lucide.createIcons();
    })
    .catch(err => console.error("Error loading tasks:", err));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskTitle = input.value.trim();

  if (!taskTitle) return;

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskTitle })
  }).then(() => {
    input.value = "";
    loadTasks();
  });
}

function deleteTask(id) {
  fetch(`${API}/${id}`, { method: "DELETE" })
    .then(() => loadTasks());
}

// Add task on "Enter" key press
document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Initial load
loadTasks();