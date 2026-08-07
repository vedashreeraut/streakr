function Heatmap({ tasks }) {

    const activity = {};

    tasks.forEach((task) => {

        if (!task.completedAt) return;

        const date = new Date(task.completedAt)
            .toISOString()
            .split("T")[0];

        activity[date] = (activity[date] || 0) + 1;

    });
    const totalContributions = Object.values(activity)
        .reduce((sum, value) => sum + value, 0);

    const activeDays = Object.keys(activity).length;

    const bestDay =
        Math.max(...Object.values(activity), 0);

    const days = [];

    for (let i = 364; i >= 0; i--) {

        const d = new Date();

        d.setDate(d.getDate() - i);

        const key = d.toISOString().split("T")[0];

        days.push({
            date: key,
            count: activity[key] || 0,
        });

    }

    function getColor(count) {

        if (count === 0)
            return "bg-gray-200";

        if (count === 1)
            return "bg-green-200";

        if (count === 2)
            return "bg-green-400";

        if (count === 3)
            return "bg-green-600";

        return "bg-green-800";

    }

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
                365-Day Activity
            </h2>

            <div className="grid grid-cols-3 gap-6 mb-8">

                <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-gray-500">
                        Contributions
                    </p>

                    <h2 className="text-3xl font-bold">
                        {totalContributions}
                    </h2>

                </div>

                <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-gray-500">
                        Active Days
                    </p>

                    <h2 className="text-3xl font-bold">
                        {activeDays}
                    </h2>

                </div>

                <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-gray-500">
                        Best Day
                    </p>

                    <h2 className="text-3xl font-bold">
                        {bestDay}
                    </h2>

                </div>

            </div>
            <div className="grid grid-cols-53 gap-1">

                {days.map((day) => (

                    <div
                        key={day.date}
                        title={`${day.count} completed task${day.count !== 1 ? "s" : ""}\n${day.date}`} className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
                    />

                ))}

            </div>

            <div className="flex gap-3 mt-5 text-sm text-gray-500">

                <span>Less Active</span>

                <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>

                <div className="w-3 h-3 bg-green-200 rounded-sm"></div>

                <div className="w-3 h-3 bg-green-400 rounded-sm"></div>

                <div className="w-3 h-3 bg-green-600 rounded-sm"></div>

                <div className="w-3 h-3 bg-green-800 rounded-sm"></div>

                <span>More Active</span>

            </div>

        </div>

    );

}

export default Heatmap;