import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getTasks } from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(
            localStorage.getItem("user")
        );

        setUser(storedUser);
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

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const xp = completedTasks * 10;

    const level = Math.max(
        1,
        Math.floor(xp / 100) + 1
    );

    function calculateCurrentStreak(tasks) {
        const completedDates = tasks
            .filter((task) => task.completedAt)
            .map((task) => {
                const d = new Date(task.completedAt);
                d.setHours(0, 0, 0, 0);
                return d.getTime();
            });

        const uniqueDates = [...new Set(completedDates)].sort((a, b) => b - a);

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

    const streak = calculateCurrentStreak(tasks);

    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-8">
                My Profile
            </h1>

            <div className="bg-white rounded-2xl shadow p-8 max-w-3xl">

                <div className="flex items-center gap-6">

                    <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-4xl text-white font-bold">
                        {user?.name
                            ?.split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                    </div>

                    <div>

                        <h2 className="text-3xl font-bold">
                            {user?.name}
                        </h2>

                        <p className="text-gray-500">
                            {user?.email}
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6 mt-10">

                    <div className="bg-slate-100 rounded-xl p-5">
                        <p className="text-gray-500">
                            Level
                        </p>

                        <h2 className="text-3xl font-bold">
                            {level}
                        </h2>
                    </div>

                    <div className="bg-slate-100 rounded-xl p-5">
                        <p className="text-gray-500">
                            XP
                        </p>

                        <h2 className="text-3xl font-bold">
                            {xp}
                        </h2>
                    </div>

                    <div className="bg-slate-100 rounded-xl p-5">
                        <p className="text-gray-500">
                            Current Streak
                        </p>

                        <h2 className="text-3xl font-bold">
                            {streak} Days
                        </h2>
                    </div>

                    <div className="bg-slate-100 rounded-xl p-5">
                        <p className="text-gray-500">
                            Longest Streak
                        </p>

                        <h2 className="text-3xl font-bold">
                            0 Days
                        </h2>
                    </div>

                </div>
                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-5">
                        Achievements
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        <div
                            className={`rounded-xl p-4 ${completedTasks >= 1
                                ? "bg-green-100"
                                : "bg-gray-100"
                                }`}
                        >
                            🥇 First Task
                        </div>

                        <div
                            className={`rounded-xl p-4 ${xp >= 100
                                ? "bg-green-100"
                                : "bg-gray-100"
                                }`}
                        >
                            ⭐ 100 XP
                        </div>

                        <div
                            className={`rounded-xl p-4 ${streak >= 7
                                ? "bg-green-100"
                                : "bg-gray-100"
                                }`}
                        >
                            🔥 7 Day Streak
                        </div>

                        <div
                            className={`rounded-xl p-4 ${completedTasks >= 25
                                ? "bg-green-100"
                                : "bg-gray-100"
                                }`}
                        >
                            🏆 25 Tasks Completed
                        </div>

                    </div>

                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.href = "/auth";
                    }}
                    className="mt-10 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                    Logout
                </button>

            </div>

        </Layout>
    );
}

export default Profile;