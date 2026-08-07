import { createContext, useContext, useEffect, useState } from "react";
import { getTasks } from "../services/api";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  loadTasks();
}, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}