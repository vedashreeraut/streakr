import Layout from "../components/Layout";

const users = [
  {
    rank: 1,
    name: "Vedashree",
    xp: 520,
    streak: 14,
    tasks: 52,
    you: true,
  },
  {
    rank: 2,
    name: "Alex",
    xp: 470,
    streak: 12,
    tasks: 49,
  },
  {
    rank: 3,
    name: "Sarah",
    xp: 430,
    streak: 10,
    tasks: 45,
  },
  {
    rank: 4,
    name: "John",
    xp: 390,
    streak: 9,
    tasks: 41,
  },
];

function Leaderboard() {
  return (
    <Layout>
      <h1 className="text-5xl font-bold">
        Leaderboard
      </h1>

      <p className="text-gray-500 mt-2 mb-10">
        Compete with your friends and stay motivated.
      </p>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        {users.map((user) => (

          <div
            key={user.rank}
            className={`flex items-center justify-between px-8 py-6 border-b last:border-none
            ${
              user.you
                ? "bg-orange-50"
                : ""
            }`}
          >

            <div className="flex items-center gap-6">

              <span className="text-3xl font-bold w-10">

                {user.rank === 1
                  ? "🥇"
                  : user.rank === 2
                  ? "🥈"
                  : user.rank === 3
                  ? "🥉"
                  : `#${user.rank}`}

              </span>

              <div>

                <h2 className="text-xl font-semibold">

                  {user.name}

                  {user.you && (
                    <span className="ml-2 text-orange-500">
                      (You)
                    </span>
                  )}

                </h2>

                <p className="text-gray-500">
                  🔥 {user.streak} day streak
                </p>

              </div>

            </div>

            <div className="text-right">

              <h2 className="font-bold text-xl">
                {user.xp} XP
              </h2>

              <p className="text-gray-500">
                {user.tasks} tasks completed
              </p>

            </div>

          </div>

        ))}

      </div>
    </Layout>
  );
}

export default Leaderboard;