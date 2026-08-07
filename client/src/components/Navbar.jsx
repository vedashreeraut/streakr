import {
  Bell,
  UserCircle,
  LogOut,
  Settings,
  User,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return {};
    }
  }, []);

  const greeting = (() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 17) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  })();

  return (
    <header className="sticky top-0 z-30 mb-10 rounded-[30px] bg-white/60 backdrop-blur-xl border border-white/40 px-8 py-5 shadow-lg flex justify-between items-center">

      <div>
        <p className="text-slate-500 text-sm font-medium">
          {greeting}
        </p>

        <h1 className="text-3xl font-bold mt-1">
          {user?.name || "Welcome"}
        </h1>
      </div>

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="hidden lg:flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm w-80">

          <Search size={18} className="text-slate-400" />

          <input
            placeholder="Search tasks..."
            className="outline-none bg-transparent flex-1 text-sm"
          />

        </div>

        {/* Notifications */}

        <button
          onClick={() => navigate("/notifications")}
          className="relative h-14 w-14 rounded-2xl bg-white/60 backdrop-blur-xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center"
        >

          <Bell size={22} />

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}

        <div className="relative">

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="h-14 w-14 rounded-2xl bg-white/60 backdrop-blur-xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-center"
          >
            <UserCircle size={26} />
          </button>

          {showMenu && (

            <div className="absolute right-0 mt-3 w-60 rounded-[30px] bg-white border border-slate-200 shadow-xl overflow-hidden z-50">

              <div className="px-5 py-4 border-b">

                <p className="font-semibold">
                  {user?.name}
                </p>

                <p className="text-sm text-slate-500">
                  {user?.email}
                </p>

              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 w-full px-5 py-4 hover:bg-slate-50"
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={() => {
                  navigate("/settings");
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 w-full px-5 py-4 hover:bg-slate-50"
              >
                <Settings size={18} />
                Settings
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setShowMenu(false);
                  navigate("/auth", { replace: true });
                }}
                className="flex items-center gap-3 w-full px-5 py-4 text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} />
                Sign Out
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;