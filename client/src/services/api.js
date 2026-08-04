const API = "http://127.0.0.1:3001/tasks";

export async function getTasks() {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}
export async function createTask(task) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}