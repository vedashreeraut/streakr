import Layout from "../components/Layout";

const notifications = [
  {
    id: 1,
    title: "🔥 Keep your streak alive!",
    message: "You haven't completed a task today.",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "✅ Task Completed",
    message: "Interview was marked as complete.",
    time: "15 minutes ago",
    unread: true,
  },
  {
    id: 3,
    title: "⭐ Level Up",
    message: "Congratulations! You reached Level 2.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    title: "🏆 Leaderboard Update",
    message: "Alex has passed you in XP.",
    time: "Yesterday",
    unread: false,
  },
];

function Notifications() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500 mt-2">
            Stay updated with your progress.
          </p>
        </div>

        <button
          className="text-orange-500 font-semibold hover:underline"
        >
          Mark all as read
        </button>

      </div>

      <div className="space-y-5">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className={`bg-white rounded-2xl shadow p-6 border-l-4 ${
              notification.unread
                ? "border-orange-500"
                : "border-transparent"
            }`}
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="font-semibold text-xl">
                  {notification.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {notification.message}
                </p>

              </div>

              {notification.unread && (
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              )}

            </div>

            <p className="text-gray-400 text-sm mt-4">
              {notification.time}
            </p>

          </div>

        ))}

      </div>
    </Layout>
  );
}

export default Notifications;