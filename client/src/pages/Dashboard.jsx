
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import StatsSection from "../components/StatsSection";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import EmptyState from "../components/EmptyState";

import {
  getTasks,
  deleteTask,
  toggleTask,
  togglePin,
} from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadTasks();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteTask(id);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );

      toast.success("Task deleted");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggle(id) {
    try {
      const updatedTask = await toggleTask(id);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? updatedTask : task
        )
      );

      toast.success(
        updatedTask.completed
          ? "Task completed!"
          : "Task reopened"
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePin(id) {
    try {
      const updatedTask = await togglePin(id);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = tasks.length;

  const xp = completedTasks * 10;

  const level = Math.max(
    1,
    Math.floor(xp / 100) + 1
  );

  function calculateStreak(tasks) {
    const completedDates = tasks
      .filter((task) => task.completedAt)
      .map((task) => {
        const d = new Date(task.completedAt);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      });

    const uniqueDates = [...new Set(completedDates)].sort(
      (a, b) => b - a
    );

    if (uniqueDates.length === 0) return 0;

    let streak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let current = today.getTime();

    for (const date of uniqueDates) {
      if (date === current) {
        streak++;
        current -= 86400000;
      } else {
        break;
      }
    }

    return streak;
  }

  const streak = calculateStreak(tasks);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = tasks
    .filter((task) => {
      if (task.completed) return false;

      if (!task.dueDate) return true;

      const due = new Date(task.dueDate);
      due.setHours(0, 0, 0, 0);

      return due <= today;
    })
    .slice(0, 3);
  return (
    <Layout>
      <StatsSection
        streak={streak}
        xp={xp}
        level={level}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
      />

      <div className="flex justify-between items-center mt-12 mb-8">
        <div>
          <h2 className="text-4xl font-bold">
            Today's Tasks
          </h2>

          <p className="text-gray-500 mt-2">
            Focus on these first.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + New Task
        </button>
      </div>

      <div className="space-y-4">
        {todayTasks.length === 0 ? (
          <EmptyState
            title="No tasks for today!"
            subtitle="Create one to keep your streak alive."
          />
        ) : (
          todayTasks.map((task) => (
            <TaskCard
              key={task._id}
              {...task}
              id={task._id}
              dueDate={
                task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"
              }
              onDelete={handleDelete}
              onToggle={handleToggle}
              onPin={handlePin}
              onEdit={() => {
                setEditingTask(task);
                setShowModal(true);
              }}
            />
          ))
        )}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate("/tasks")}
          className="text-orange-500 font-semibold hover:underline"
        >
          View All Tasks →
        </button>
      </div>

      <AddTaskModal
        isOpen={showModal}
        editingTask={editingTask}
        onClose={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        onTaskCreated={(task) => {
          if (editingTask) {
            setTasks((prev) =>
              prev.map((t) =>
                t._id === task._id ? task : t
              )
            );
          } else {
            setTasks((prev) => [task, ...prev]);
          }
        }}
      />
    </Layout>
  );
}

export default Dashboard;