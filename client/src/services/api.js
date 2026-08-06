const API = "http://127.0.0.1:3001/tasks";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getTasks() {
  const response = await fetch(API, {
  headers: authHeaders(),
});

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}
export async function createTask(task) {
  const response = await fetch(API, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}
export async function deleteTask(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}
export async function toggleTask(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}
export async function login(email, password) {
  const response = await fetch(
    "http://127.0.0.1:3001/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
export async function register(name, email, password) {
  const response = await fetch(
    "http://127.0.0.1:3001/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
export async function updateTask(id, updates) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }
  );

  return response.json();
}
export async function togglePin(id) {
  const response = await fetch(
    `${API}/${id}/pin`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );

  return response.json();
}