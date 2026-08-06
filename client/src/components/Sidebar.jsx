import { NavLink } from "react-router-dom";
const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Tasks",
    path: "/tasks",
  },
  {
    name: "Friends",
    path: "/friends",
  },
  {
    name: "Leaderboard",
    path: "/leaderboard",
  },
  {
    name: "Analytics",
    path: "/analytics",
  },
  {
    name: "Settings",
    path: "/settings",
  },
  {
  name: "Achievements",
  path: "/achievements",
},
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-10">
        🔥 Streakr
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block w-full text-left px-4 py-3 rounded-xl transition ${isActive
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-100"
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