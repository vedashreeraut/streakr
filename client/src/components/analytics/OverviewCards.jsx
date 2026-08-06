function OverviewCards({
  totalTasks,
  completionRate,
  xp,
  longestStreak,
}) {
  return (
    <div className="grid grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl p-6 shadow">
        <p className="text-gray-500">
          Total Tasks
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {totalTasks}
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <p className="text-gray-500">
          Completion Rate
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {completionRate}%
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <p className="text-gray-500">
          XP Earned
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {xp}
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <p className="text-gray-500">
          Longest Streak
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {longestStreak} Days
        </h2>
      </div>

    </div>
  );
}

export default OverviewCards;