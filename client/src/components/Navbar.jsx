import { Bell, UserCircle } from "lucide-react";

function Navbar() {
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
        <Bell className="cursor-pointer" />

        <UserCircle
          size={34}
          className="cursor-pointer"
        />
      </div>
    </header>
  );
}

export default Navbar;