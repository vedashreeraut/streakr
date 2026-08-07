import Layout from "../components/Layout";
import Heatmap from "../components/analytics/Heatmap";

import {
  getMyProfile,
  getUserProfile,
  getTasks,
} from "../services/api";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadProfile();
    loadTasks();
  }, [id]);

  async function loadProfile() {
    try {
      const data = id
        ? await getUserProfile(id)
        : await getMyProfile();

      setUser(data);

    } catch (err) {
      console.error(err);
    }
  }

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);

    } catch (err) {
      console.error(err);
    }
  }

  if (!user)
    return (
      <Layout>
        Loading...
      </Layout>
    );

  const level = Math.max(
    1,
    Math.floor(user.xp / 100) + 1
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const achievements = [
    {
      title: "First Task",
      unlocked: completedTasks >= 1,
    },
    {
      title: "10 Tasks",
      unlocked: completedTasks >= 10,
    },
    {
      title: "25 Tasks",
      unlocked: completedTasks >= 25,
    },
    {
      title: "100 XP",
      unlocked: user.xp >= 100,
    },
    {
      title: "500 XP",
      unlocked: user.xp >= 500,
    },
    {
      title: "7 Day Streak",
      unlocked: user.streak >= 7,
    },
  ];
  return (
    <Layout>

      <div className="rounded-[34px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl p-10">

        <div className="flex items-center gap-8">

          <div className="h-28 w-28 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center text-5xl font-black shadow-lg">

            {user.name.charAt(0).toUpperCase()}

          </div>

          <div>

            <h1 className="text-5xl font-black">
              {user.name}
            </h1>

            <p className="text-slate-500 mt-2">
              {user.email}
            </p>

            <div className="mt-5 inline-flex rounded-full bg-orange-100 px-4 py-2 text-orange-600 font-semibold">
              🔥 {user.streak} Day Streak
            </div>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 p-7 shadow-lg hover:-translate-y-1 transition">

          <p className="text-slate-500">
            Level
          </p>

          <h2 className="text-5xl font-black mt-3">
            {level}
          </h2>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-yellow-50 to-amber-100 p-7 shadow-lg hover:-translate-y-1 transition">

          <p className="text-slate-500">
            XP
          </p>

          <h2 className="text-5xl font-black mt-3">
            {user.xp}
          </h2>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-red-50 to-orange-100 p-7 shadow-lg hover:-translate-y-1 transition">

          <p className="text-slate-500">
            Streak
          </p>

          <h2 className="text-5xl font-black mt-3">
            🔥 {user.streak}
          </h2>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-100 p-7 shadow-lg hover:-translate-y-1 transition">

          <p className="text-slate-500">
            Friends
          </p>

          <h2 className="text-5xl font-black mt-3">
            {user.friends?.length || 0}
          </h2>

        </div>

      </div>

      <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8 mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Activity Heatmap
        </h2>

        <Heatmap tasks={tasks} />

      </div>

      <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8 mt-10">

        <h2 className="text-3xl font-bold mb-8">
          Achievements
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {achievements.map((achievement) => (

            <div
              key={achievement.title}
              className={`rounded-3xl p-6 shadow transition hover:-translate-y-1 ${achievement.unlocked
                  ? "bg-gradient-to-br from-green-50 to-emerald-100 border border-green-300"
                  : "bg-slate-100 border border-slate-200"
                }`}
            >

              <div className="text-5xl">

                {achievement.unlocked ? "🏆" : "🔒"}

              </div>

              <h3 className="font-bold text-xl mt-5">

                {achievement.title}

              </h3>

              <p className="mt-3 text-slate-500">

                {achievement.unlocked
                  ? "Achievement unlocked"
                  : "Keep going"}

              </p>

            </div>

          ))}

        </div>

      </div>

    </Layout>
  );
}

export default Profile;