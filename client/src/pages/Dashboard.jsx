import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";

import { getTasks } from "../services/api";
import AddTaskModal from "../components/AddTaskModal";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
  async function loadTasks() {
    try {
      const data = await getTasks();

      console.log("FROM API", data);

      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  loadTasks();
}, []);
  console.log("STATE", tasks);
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-10">
        <Navbar />

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <StatCard icon="🔥" title="Current Streak" value="17 Days" />
          <StatCard icon="⭐" title="XP" value="1260" />
          <StatCard icon="🏆" title="Level" value="12" />
          <StatCard icon="✅" title="Today's Tasks" value="3 / 5" />
        </div>

        {/* Today's Tasks */}
        <section className="mt-12">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-bold">
      Today's Tasks
    </h2>

   <button
  onClick={() => setShowModal(true)}
  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-xl transition"
>
  + New Task
</button>

  </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                priority={task.priority}
                dueDate={
                task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
               : "No due date"
         }
        completed={task.completed}
  />
))}
          </div>
        </section>
      </main>
      <AddTaskModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onTaskCreated={(task) =>
    setTasks((prev) => [task, ...prev])
  }
/>
    </div>
  );
}

export default Dashboard;