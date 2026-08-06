import Layout from "../components/Layout";

import OverviewCards from "../components/analytics/OverviewCards";
import WeeklyChart from "../components/analytics/WeeklyChart";
import PriorityChart from "../components/analytics/PriorityChart";
import Insights from "../components/analytics/Insights";
import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
function Analytics() {
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
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const completionRate =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    const xp = completedTasks * 10;
    function calculateLongestStreak(tasks) {
        const completedDates = tasks
            .filter((task) => task.completedAt)
            .map((task) => {
                const d = new Date(task.completedAt);
                d.setHours(0, 0, 0, 0);
                return d.getTime();
            });

        const uniqueDates = [...new Set(completedDates)].sort((a, b) => a - b);

        if (uniqueDates.length === 0) return 0;

        let longest = 1;
        let current = 1;

        for (let i = 1; i < uniqueDates.length; i++) {
            if (
                uniqueDates[i] - uniqueDates[i - 1] ===
                24 * 60 * 60 * 1000
            ) {
                current++;
                longest = Math.max(longest, current);
            } else {
                current = 1;
            }
        }

        return longest;
    }

    const longestStreak =
        calculateLongestStreak(tasks);
    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-2">
                Analytics
            </h1>

            <p className="text-gray-500 mb-10">
                Track your productivity and progress.
            </p>

            <OverviewCards
                totalTasks={totalTasks}
                completionRate={completionRate}
                xp={xp}
                longestStreak={longestStreak}
            />

            <WeeklyChart tasks={tasks} />

            <div className="grid grid-cols-2 gap-8 mt-8">
                <PriorityChart tasks={tasks} />
                <Insights tasks={tasks} />
            </div>
        </Layout>
    );
}

export default Analytics;