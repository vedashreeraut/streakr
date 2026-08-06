import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();
async function handleLogin(e) {
  e.preventDefault();

  try {
    const data = await login(email, password);

    localStorage.setItem("token", data.token);

    navigate("/dashboard");

  } catch (err) {
    alert(err.message);
  }
}
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-10">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold">
            🔥 STREAKR
          </h1>

          <p className="text-gray-500 mt-3">
            Build consistency, one day at a time.
          </p>

        </div>

        <form
  onSubmit={handleLogin}
  className="space-y-5"
>

          <div>

            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Log In
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-8">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;