import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Tasks", path: "/tasks" },
  { name: "Friends", path: "/friends" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Analytics", path: "/analytics" },
  { name: "Settings", path: "/settings" },
];

function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-white/70 backdrop-blur-2xl border-r border-white/40 shadow-2xl px-7 py-8 sticky top-0">

      <div className="flex items-center gap-3 mb-14">

        <div className="text-5xl">
          🔥
        </div>

        <div>

          <h1 className="text-3xl font-black bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
            Streakr
          </h1>

          <p className="text-xs text-slate-500">
            Build habbits. Once streak at a time.
          </p>

        </div>

      </div>

      <nav className="space-y-3">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center rounded-2xl px-5 py-4 font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-xl scale-[1.03]"
                  : "hover:bg-orange-50 hover:translate-x-1 text-slate-600"
              }`
            }
          >
            {item.name}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;