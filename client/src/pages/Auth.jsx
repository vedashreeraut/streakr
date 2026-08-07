import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";
import loginBg from "../assets/login-bg.png";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (isLogin) {
                const data = await login(email, password);

                localStorage.setItem("token", data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                navigate("/dashboard");
            } else {
                await register(name, email, password);

                // Tell the user what happened
                alert("Account created successfully! Please log in.");

                // Switch back to Login
                setIsLogin(true);

                // Clear all fields
                setName("");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            alert(err.message);
        }
    }
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed,white_60%)] flex items-center justify-center p-10">
            <div className="bg-white rounded-[36px] shadow-2xl overflow-hidden w-full max-w-5xl grid grid-cols-2">
                {/* LEFT */}

                <div
                    className="relative overflow-hidden text-white p-12 flex flex-col justify-between bg-cover bg-right"
                    style={{
                        backgroundImage: `url(${loginBg})`,
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>

                    <div className="relative z-10">
                        <h1 className="text-[2.6rem] font-extrabold flex items-center gap-3">
                            🔥 STREAKR
                        </h1>

                        <p className="mt-8 text-2rem] font-semibold leading-relaxed">
                            Build habits.
                            <br />
                            Protect your streak.
                            <br />
                            Level up.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4 text-2.3rem]">

                        <div className="flex items-center gap-3">
                            <span>✔</span>
                            <span>Complete daily goals</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span>🔥</span>
                            <span>Maintain streaks</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span>🏆</span>
                            <span>Earn XP & Level Up</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span>👥</span>
                            <span>Compete with friends</span>
                        </div>

                    </div>
                </div>

                {/* RIGHT */}

                <div className="p-10 flex flex-col justify-center min-h-[550px]">

                    <h2 className="text-3xl font-bold mb-3">

                        {isLogin ? "Welcome Back" : "Create Account"}

                    </h2>

                    <p className="text-gray-500 mb-10">

                        {isLogin
                            ? "Log in to continue your streak."
                            : "Start building better habits today."}

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition" />
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition" />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition" />

                        <button
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-400 hover:scale-[1.02] transition text-white py-2.5 rounded-xl font-semibold transition"
                        >
                            {isLogin ? "Log In" : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">

                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-orange-500 font-semibold hover:underline"
                        >
                            {isLogin
                                ? "Don't have an account? Create an account"
                                : "Already have an account? Log in"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Auth;