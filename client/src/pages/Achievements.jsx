import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getTasks } from "../services/api";

function Achievements() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getTasks();
      setTasks(data);
    }

    load();
  }, []);

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const xp = completed * 10;

  const badges = [
    {
      title: "First Task",
      unlocked: completed >= 1,
    },
    {
      title: "10 Tasks Completed",
      unlocked: completed >= 10,
    },
    {
      title: "25 Tasks Completed",
      unlocked: completed >= 25,
    },
    {
      title: "100 XP",
      unlocked: xp >= 100,
    },
    {
      title: "250 XP",
      unlocked: xp >= 250,
    },
    {
      title: "500 XP",
      unlocked: xp >= 500,
    },
  ];

  return (
    <Layout>

      <h1 className="text-5xl font-bold">
        Achievements
      </h1>

      <p className="text-gray-500 mt-2 mb-10">
        Unlock rewards by staying productive.
      </p>

      <div className="grid grid-cols-2 gap-6">

        {badges.map((badge) => (

          <div
            key={badge.title}
            className={`rounded-2xl shadow p-6 ${
              badge.unlocked
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >

            <h2 className="font-bold text-xl">
              🏅 {badge.title}
            </h2>

            <p className="mt-3">

              {badge.unlocked
                ? "Unlocked"
                : "Locked"}

            </p>

          </div>

        ))}

      </div>

    </Layout>
  );
}

export default Achievements;