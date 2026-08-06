import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
];

function PriorityChart({ tasks }) {
  const data = [
    {
      name: "High",
      value: tasks.filter(
        (t) => t.priority === "High"
      ).length,
    },
    {
      name: "Medium",
      value: tasks.filter(
        (t) => t.priority === "Medium"
      ).length,
    },
    {
      name: "Low",
      value: tasks.filter(
        (t) => t.priority === "Low"
      ).length,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        Tasks by Priority
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PriorityChart;