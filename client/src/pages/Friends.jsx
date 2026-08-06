import Layout from "../components/Layout";
import { useState } from "react";

const allFriends = [
  {
    id: 1,
    name: "Alex",
    streak: 18,
    xp: 620,
    online: true,
  },
  {
    id: 2,
    name: "Sarah",
    streak: 11,
    xp: 510,
    online: false,
  },
  {
    id: 3,
    name: "John",
    streak: 7,
    xp: 420,
    online: true,
  },
  {
    id: 4,
    name: "Emily",
    streak: 24,
    xp: 790,
    online: false,
  },
];

function Friends() {
  const [search, setSearch] = useState("");

  const friends = allFriends.filter((friend) =>
    friend.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-5xl font-bold">
            Friends
          </h1>

          <p className="text-gray-500 mt-2">
            Stay motivated together.
          </p>

        </div>

        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Friend
        </button>

      </div>

      <input
        type="text"
        placeholder="Search friends..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 mb-8"
      />

      <div className="space-y-5">

        {friends.map((friend) => (

          <div
            key={friend.id}
            className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
          >

            <div>

              <h2 className="text-xl font-semibold">
                {friend.name}
              </h2>

              <p className="text-gray-500 mt-1">
                🔥 {friend.streak} day streak
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold">
                {friend.xp} XP
              </p>

              <span
                className={`text-sm font-medium ${
                  friend.online
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {friend.online
                  ? "● Online"
                  : "● Offline"}
              </span>

            </div>

          </div>

        ))}

      </div>

    </Layout>
  );
}

export default Friends;