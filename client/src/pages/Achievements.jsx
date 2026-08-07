import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AchievementCard from "../components/achievements/AchievementCard";
import { getTasks } from "../services/api";

function Achievements() {
    const [tasks, setTasks] = useState([]);

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

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

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

    const completedToday = tasks.filter((task) => {
        if (!task.completedAt) return false;

        const date = new Date(task.completedAt);
        date.setHours(0, 0, 0, 0);

        return date.getTime() === today.getTime();
    }).length;

    const achievements = [
        {
            icon: "🎯",
            title: "First Step",
            description: "Complete your first task.",
            unlocked: completedTasks >= 1,
            current: completedTasks,
            target: 1,
        },
        {
            icon: "🔥",
            title: "On Fire",
            description: "Maintain a 3-day streak.",
            unlocked: streak >= 3,
            current: streak,
            target: 3,
        },
        {
            icon: "⭐",
            title: "XP Hunter",
            description: "Earn 100 XP.",
            unlocked: xp >= 100,
            current: xp,
            target: 100,
        },
        {
            icon: "🏆",
            title: "Task Master",
            description: "Complete 25 tasks.",
            unlocked: completedTasks >= 25,
            current: completedTasks,
            target: 25,
        },
        {
            icon: "⚡",
            title: "Productive Day",
            description: "Complete 5 tasks in one day.",
            unlocked: completedToday >= 5,
            current: completedToday,
            target: 5,
        },
        {
            icon: "👑",
            title: "Level Up",
            description: "Reach Level 5.",
            unlocked: level >= 5,
            current: level,
            target: 5,
        },
    ];
    const unlockedCount = achievements.filter(
        (achievement) => achievement.unlocked
    ).length;

    const progress = Math.round(
        (unlockedCount / achievements.length) * 100
    );

    return (
        <Layout>
            <h1 className="text-5xl font-bold">
                Achievements
            </h1>

            <p className="text-gray-500 mt-2 mb-10">
                Unlock achievements as you stay productive.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-10">

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-gray-500">
                        Achievements Unlocked
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {unlockedCount}/{achievements.length}
                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-gray-500">
                        Completion
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {progress}%
                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    <p className="text-gray-500">
                        Current Level
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {level}
                    </h2>

                </div>

            </div>
            <div className="bg-white rounded-2xl shadow p-6 mb-10">

                <div className="flex justify-between mb-3">

                    <span className="font-semibold">
                        Overall Progress
                    </span>

                    <span>
                        {progress}%
                    </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-4">

                    <div
                        className="bg-orange-500 h-4 rounded-full transition-all duration-700"
                        style={{
                            width: `${progress}%`,
                        }}
                    ></div>

                </div>

            </div>

            <div className="grid grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                    <AchievementCard
                        key={achievement.title}
                        {...achievement}
                    />
                ))}
            </div>
        </Layout>
    );
}

export default Achievements;