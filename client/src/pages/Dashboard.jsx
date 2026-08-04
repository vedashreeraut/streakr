import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";

function Dashboard() {
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
          <h2 className="text-2xl font-bold mb-6">
            Today's Tasks
          </h2>

          <div className="space-y-4">
            <TaskCard
              title="Finish React Dashboard"
              priority="High"
              dueDate="Today"
            />

            <TaskCard
              title="Workout"
              priority="Medium"
              dueDate="Today"
            />

            <TaskCard
              title="Read 20 Pages"
              priority="Low"
              dueDate="Tomorrow"
              completed={true}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;