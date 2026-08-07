import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Flame,
  Trophy,
  Star,
  CheckCircle2,
  ArrowRight,
  Target,
} from "lucide-react";

import Layout from "../components/Layout";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import EmptyState from "../components/EmptyState";
import StatsSection from "../components/StatsSection";

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

  async function handleDelete(id) {
    await deleteTask(id);

    setTasks((prev) =>
      prev.filter((task) => task._id !== id)
    );

    toast.success("Task deleted");
  }

  async function handleToggle(id) {
    const updated = await toggleTask(id);

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? updated : task
      )
    );

    toast.success(
      updated.completed
        ? "🔥 +10 XP"
        : "Task reopened"
    );
  }

  async function handlePin(id) {
    const updated = await togglePin(id);

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? updated : task
      )
    );
  }

  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;

  const xp = completed * 10;
  const level = Math.max(1, Math.floor(xp / 100) + 1);

  const streak =
    [...new Set(
      tasks
        .filter(t => t.completedAt)
        .map(t => new Date(t.completedAt).toDateString())
    )].length;

  const todayTasks = tasks
    .filter(t => !t.completed)
    .slice(0, 4);

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Layout>

      <div className="relative overflow-hidden rounded-[36px] border border-white/40 bg-white/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-12">

        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-orange-300/40 blur-3xl"></div>

        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"></div>

        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent"></div>

        <div className="relative flex justify-between items-center">

          <div>

            <h1 className="mt-4 text-5xl font-extrabold text-slate-800">
              Hello, {user?.name} 👋
            </h1>

            <p className="mt-4 text-lg text-slate-600 max-w-xl">
              Build habits, protect your streak, and level up every single day.
            </p>

            <div className="mt-8 flex gap-4">

              <button
                onClick={() => setShowModal(true)}
                className="rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 px-6 py-3 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                + New Task
              </button>

              <button
                onClick={() => navigate("/tasks")}
                className="rounded-2xl border border-slate-300 bg-white/70 backdrop-blur px-6 py-3 font-semibold hover:bg-white transition"
              >
                View Tasks
              </button>

            </div>

          </div>

          <div className="hidden xl:block">

            <div className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 p-8 shadow-lg">

              <p className="text-slate-500">
                Current Streak
              </p>

              <h2 className="text-6xl font-black mt-2">
                🔥 {streak}
              </h2>

              <p className="text-slate-500 mt-2">
                Keep going!
              </p>

            </div>

          </div>

        </div>

      </div>

      <StatsSection
        streak={streak}
        xp={xp}
        level={level}
        completedTasks={completed}
        totalTasks={total}
      />

      <div className="flex justify-between items-center mt-12">

        <div>

          <h2 className="text-5xl font-bold flex items-center gap-3">
            <Target className="text-orange-500" />
            Today's Focus
          </h2>

          <p className="text-gray-500 mt-2">
            Complete these tasks to protect today's streak.
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-3 text-white font-semibold shadow-xl hover:scale-105 transition"        >
          + New Task
        </button>

      </div>

      <div className="space-y-6 mt-8">

        {todayTasks.length === 0 ? (

          <EmptyState
            title="You're all caught up!"
            subtitle="Enjoy the rest of your day."
          />

        ) : (

          todayTasks.map(task => (

            <TaskCard
              key={task._id}
              {...task}
              id={task._id}
              repeat={task.repeat}
              isPrivate={task.isPrivate}
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

      <button
        onClick={() => navigate("/tasks")}
        className="flex items-center gap-2 text-orange-500 font-semibold mt-8 hover:translate-x-1 transition-all"
      >
        View All Tasks
        <ArrowRight size={18} />
      </button>

      <AddTaskModal
        isOpen={showModal}
        editingTask={editingTask}
        onClose={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        onTaskCreated={(task) => {
          if (editingTask) {
            setTasks(prev =>
              prev.map(t =>
                t._id === task._id ? task : t
              )
            );
          } else {
            setTasks(prev => [task, ...prev]);
          }
        }}
      />

    </Layout>
  );
}

export default Dashboard;