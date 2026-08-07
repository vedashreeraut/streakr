import StatCard from "./StatCard";

function StatsSection({
  streak,
  xp,
  level,
  completedTasks,
  totalTasks,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      <StatCard
        icon="🔥"
        title="Current Streak"
        value={`${streak} Day${streak !== 1 ? "s" : ""}`}
      />

      <StatCard
        icon="⭐"
        title="XP"
        value={`${xp} XP`}
      />

      <StatCard
        icon="🏆"
        title="Level"
        value={level}
      />

      <StatCard
        icon="✅"
        title="Today's Tasks"
        value={`${completedTasks} / ${totalTasks}`}
      />

    </div>
  );
}

export default StatsSection;