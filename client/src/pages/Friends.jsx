import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
    getUsers,
    getFriends,
    getPendingRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
} from "../services/api";

function Friends() {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [allUsers, myFriends, pending] =
                await Promise.all([
                    getUsers(),
                    getFriends(),
                    getPendingRequests(),
                ]);

            setUsers(allUsers);
            setFriends(myFriends);
            setRequests(pending);

        } catch (err) {
            console.error(err);
        }
    }

    async function handleAddFriend(id) {
        try {
            await sendFriendRequest(id);

            toast.success("Friend request sent!");

            loadData();

        } catch (err) {
            toast.error(err.message);
        }
    }

    async function handleAccept(id) {
        try {
            await acceptFriendRequest(id);

            toast.success("Friend request accepted!");

            loadData();

        } catch (err) {
            toast.error(err.message);
        }
    }

    async function handleReject(id) {
        try {
            await rejectFriendRequest(id);

            toast.success("Friend request rejected");

            loadData();

        } catch (err) {
            toast.error(err.message);
        }
    }

    const filteredUsers = users.filter((user) =>
        user.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    return (
  <Layout>
    <div className="mb-10">
      <p className="uppercase tracking-[0.25em] text-orange-500 font-semibold">
        SOCIAL
      </p>

      <h1 className="text-5xl font-black mt-2">
        Friends
      </h1>

      <p className="text-slate-500 mt-3">
        Build habits together and climb the leaderboard.
      </p>
    </div>

    {/* SEARCH */}

    <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8 mb-10">

      <input
        type="text"
        placeholder="🔍 Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none focus:border-orange-400"
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

        {filteredUsers.length === 0 ? (
          <p className="text-slate-500">
            No users found.
          </p>
        ) : (

          filteredUsers.map((user) => (

            <div
              key={user._id}
              className="rounded-3xl bg-white p-6 shadow hover:shadow-xl hover:-translate-y-1 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center text-xl font-bold">

                  {user.name.charAt(0).toUpperCase()}

                </div>

                <div>

                  <h2 className="font-bold text-lg">
                    {user.name}
                  </h2>

                  <p className="text-slate-500 text-sm">
                    {user.email}
                  </p>

                </div>

              </div>

              <button
                onClick={() => handleAddFriend(user._id)}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 py-3 text-white font-semibold shadow hover:scale-[1.02] transition"
              >
                Add Friend
              </button>

            </div>

          ))

        )}

      </div>

    </div>

    {/* REQUESTS */}

    <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8 mb-10">

      <h2 className="text-3xl font-bold mb-6">
        Friend Requests
      </h2>

      {requests.length === 0 ? (

        <p className="text-slate-500">
          No pending requests.
        </p>

      ) : (

        requests.map((request) => (

          <div
            key={request._id}
            className="flex justify-between items-center rounded-2xl bg-slate-50 p-5 mb-4"
          >

            <div>

              <h3 className="font-semibold">
                {request.sender.name}
              </h3>

              <p className="text-slate-500 text-sm">
                wants to be your friend
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => handleAccept(request._id)}
                className="rounded-xl bg-green-500 px-5 py-2 text-white"
              >
                Accept
              </button>

              <button
                onClick={() => handleReject(request._id)}
                className="rounded-xl bg-slate-200 px-5 py-2"
              >
                Reject
              </button>

            </div>

          </div>

        ))

      )}

    </div>

    {/* FRIENDS */}

    <div className="rounded-[30px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-6">
        Your Friends
      </h2>

      {friends.length === 0 ? (

        <p className="text-slate-500">
          No friends yet.
        </p>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {friends.map((friend) => (

            <div
              key={friend._id}
              onClick={() => navigate(`/profile/${friend._id}`)}
              className="cursor-pointer rounded-3xl bg-gradient-to-br from-white to-orange-50 p-6 shadow hover:shadow-xl hover:-translate-y-1 transition"
            >

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white text-2xl font-bold mb-5">

                {friend.name.charAt(0).toUpperCase()}

              </div>

              <h2 className="text-xl font-bold">
                {friend.name}
              </h2>

              <p className="text-slate-500 mt-2">
                🔥 {friend.streak} day streak
              </p>

              <p className="text-orange-500 font-semibold mt-2">
                ⭐ {friend.xp} XP
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  </Layout>
);
}

export default Friends;