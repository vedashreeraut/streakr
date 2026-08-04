const menuItems = [
  "Dashboard",
  "Tasks",
  "Friends",
  "Leaderboard",
  "Analytics",
  "Settings",
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-10">
        🔥 Streakr
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-orange-100 transition"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;