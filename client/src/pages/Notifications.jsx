import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getNotificationSummary,
  getPendingRequests,
  getMyProfile,
} from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      const summary = await getNotificationSummary();
      const requests = await getPendingRequests();
      const user = await getMyProfile();

      const items = [];

      if (summary.overdue > 0) {
        items.push({
          title: "⚠️ Overdue Tasks",
          message: `${summary.overdue} overdue task(s).`,
        });
      }

      if (summary.dueToday > 0) {
        items.push({
          title: "📅 Due Today",
          message: `${summary.dueToday} task(s) due today.`,
        });
      }

      if (requests.length > 0) {
        items.push({
          title: "👥 Friend Requests",
          message: `${requests.length} pending request(s).`,
        });
      }

      if (user.streak > 0) {
        items.push({
          title: "🔥 Current Streak",
          message: `${user.streak} day streak.`,
        });
      }

      if (user.xp >= 100) {
        items.push({
          title: "🏆 Achievement",
          message: "100 XP milestone reached!",
        });
      }

      setNotifications(items);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>

      <h1 className="text-5xl font-bold">
        Notifications
      </h1>

      <p className="text-gray-500 mt-2 mb-10">
        Stay updated with your productivity.
      </p>

      <div className="space-y-5">

        {notifications.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-8 text-center">
            🎉 You're all caught up!
          </div>

        ) : (

          notifications.map((notification, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6 border-l-4 border-orange-500"
            >

              <h2 className="font-bold text-xl">
                {notification.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {notification.message}
              </p>

            </div>

          ))

        )}

      </div>

    </Layout>
  );
}

export default Notifications;