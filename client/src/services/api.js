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
const FRIEND_API = "http://127.0.0.1:3001/api/friends";

export async function getPendingRequests() {
  const response = await fetch(
    `${FRIEND_API}/requests`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch requests");
  }

  return response.json();
}

export async function sendFriendRequest(receiver) {
  const response = await fetch(
    `${FRIEND_API}/request`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ receiver }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send request");
  }

  return response.json();
}

export async function acceptFriendRequest(id) {
  const response = await fetch(
    `${FRIEND_API}/accept/${id}`,
    {
      method: "POST",
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to accept request");
  }

  return response.json();
}

export async function rejectFriendRequest(id) {
  const response = await fetch(
    `${FRIEND_API}/reject/${id}`,
    {
      method: "POST",
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to reject request");
  }

  return response.json();
}
export async function getUsers() {
  const response = await fetch(
    `${FRIEND_API}/users`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function getFriends() {
  const response = await fetch(
    `${FRIEND_API}/myfriends`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch friends");
  }

  return response.json();
}
export async function getMyProfile() {
  const response = await fetch(
    "http://127.0.0.1:3001/auth/me",
    {
      headers: authHeaders(),
    }
  );

  return response.json();
}

export async function getUserProfile(id) {
  const response = await fetch(
    `http://127.0.0.1:3001/api/friends/profile/${id}`,
    {
      headers: authHeaders(),
    }
  );

  return response.json();
}
export async function getLeaderboard() {
  const response = await fetch(
    `${FRIEND_API}/leaderboard`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }

  return response.json();
}
export async function getNotificationSummary() {
  const response = await fetch(
    `${API}/notifications`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
}