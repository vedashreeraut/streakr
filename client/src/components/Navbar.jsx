import { Bell, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Protect your streak today.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/notifications")}
        >

          <Bell
            className="hover:text-orange-500 transition"
            size={28}
          />

          <span
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"
          ></span>

        </div>

        <UserCircle
          size={34}
          className="cursor-pointer"
          onClick={() => navigate("/profile")}
        />
      </div>
    </header>
  );
}

export default Navbar;