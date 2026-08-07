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

            <div className="mb-10">

                <p className="uppercase tracking-[0.25em] text-orange-500 font-semibold">
                    INSIGHTS
                </p>

                <h1 className="text-5xl font-black mt-2">
                    Analytics
                </h1>

                <p className="text-slate-500 mt-3">
                    Your productivity at a glance.
                </p>

            </div>

            <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8 mb-8">

                <OverviewCards
                    totalTasks={totalTasks}
                    completionRate={completionRate}
                    xp={xp}
                    longestStreak={longestStreak}
                />

            </div>


            <div className="grid lg:grid-cols-2 gap-8">

                <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Task Priorities
                    </h2>

                    <PriorityChart tasks={tasks} />

                </div>

                <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8">

                    <h2 className="text-2xl font-bold mb-6 mt-8">
                        Productivity Insights
                    </h2>

                    <Insights tasks={tasks} />

                </div>

            </div>

            <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8 mt-8">

                <h2 className="text-2xl font-bold mb-6">
                    Weekly Activity
                </h2>

                <WeeklyChart tasks={tasks} />

            </div>

        </Layout>
    );
}
export default Analytics;