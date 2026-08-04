const API = "http://127.0.0.1:3001/tasks";

export async function getTasks() {
  const res = await fetch(API);
  return await res.json();
}

export async function createTask(task) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return await res.json();
}

export async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
}