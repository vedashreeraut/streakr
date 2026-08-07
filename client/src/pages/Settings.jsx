import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const [notifications, setNotifications] = useState(true);
const { darkMode, setDarkMode } = useTheme();
  const [dailyReminder, setDailyReminder] = useState(true);

  useEffect(() => {
    const savedNotifications =
      localStorage.getItem("notifications");

    
    const savedReminder =
      localStorage.getItem("dailyReminder");

    if (savedNotifications !== null)
      setNotifications(savedNotifications === "true");

    if (savedReminder !== null)
      setDailyReminder(savedReminder === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      notifications
    );

    localStorage.setItem(
      "dailyReminder",
      dailyReminder
    );
  }, [
    notifications,
    darkMode,
    dailyReminder,
  ]);

  return (
    <Layout>

      <h1 className="text-5xl font-bold">
        Settings
      </h1>

      <p className="text-gray-500 mt-2 mb-10">
        Customize your experience.
      </p>

      <div className="space-y-6">

        <SettingCard
          title="Notifications"
          description="Enable desktop notifications"
          checked={notifications}
          onChange={() =>
            setNotifications(!notifications)
          }
        />

        <SettingCard
          title="Daily Reminder"
          description="Receive daily reminder notifications"
          checked={dailyReminder}
          onChange={() =>
            setDailyReminder(!dailyReminder)
          }
        />

        <SettingCard
          title="Dark Mode"
          description="Switch between light and dark mode"
          checked={darkMode}
          onChange={() =>
            setDarkMode(!darkMode)
          }
        />

      </div>

    </Layout>
  );
}

function SettingCard({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

      <div>

        <h2 className="font-semibold text-xl">
          {title}
        </h2>

        <p className="text-gray-500">
          {description}
        </p>

      </div>

      <label className="relative inline-flex items-center cursor-pointer">

        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />

        <div
          className="w-14 h-8 bg-gray-300 rounded-full
          peer-checked:bg-orange-500
          after:absolute after:left-1 after:top-1
          after:w-6 after:h-6
          after:bg-white after:rounded-full
          after:transition-all
          peer-checked:after:translate-x-6"
        ></div>

      </label>

    </div>
  );
}

export default Settings;