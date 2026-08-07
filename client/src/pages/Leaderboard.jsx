import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Trophy, Medal, Award } from "lucide-react";
import { getLeaderboard } from "../services/api";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await getLeaderboard();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadLeaderboard();
  }, []);

  function getIcon(index) {
    if (index === 0)
      return <Trophy className="text-yellow-500" size={26} />;

    if (index === 1)
      return <Medal className="text-gray-400" size={24} />;

    if (index === 2)
      return <Award className="text-amber-700" size={24} />;

    return (
      <span className="font-bold text-lg">
        #{index + 1}
      </span>
    );
  }

  return (
    <Layout>

      <div className="mb-10">

        <p className="uppercase tracking-[0.25em] text-orange-500 font-semibold">
          COMPETITION
        </p>

        <h1 className="text-5xl font-black mt-2">
          Leaderboard
        </h1>

        <p className="text-slate-500 mt-3">
          See who's protecting their streaks.
        </p>

      </div>

      <div className="space-y-5">

        {users.map((user, index) => (

          <div
            key={user._id}
            className={`rounded-[28px] p-6 backdrop-blur-xl border shadow-lg flex items-center justify-between transition hover:-translate-y-1 hover:shadow-xl ${index === 0
                ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300"
                : "bg-white/70 border-white/50"
              }`}
          >

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-xl">

                {index === 0 ? (
                  <Trophy size={24} />
                ) : index === 1 ? (
                  <Medal size={24} />
                ) : index === 2 ? (
                  <Award size={24} />
                ) : (
                  index + 1
                )}

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  {user.name}
                </h2>

                <p className="text-slate-500">
                  🔥 {user.streak} day streak
                </p>

              </div>

            </div>

            <div className="text-right">

              <h2 className="text-3xl font-black text-orange-500">
                {user.xp}
              </h2>

              <p className="text-slate-500">
                XP
              </p>

            </div>

          </div>

        ))}

      </div>

    </Layout>
  );
}

export default Leaderboard;