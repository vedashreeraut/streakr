import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyChart({ tasks }) {
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const chartData = days.map((day, index) => ({
    day,
    completed: tasks.filter((task) => {
      if (!task.completedAt) return false;

      return (
        new Date(task.completedAt).getDay() === index
      );
    }).length,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Weekly Completion
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="completed"
            fill="#f97316"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default WeeklyChart;