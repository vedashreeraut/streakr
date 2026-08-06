import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";

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
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-5xl grid grid-cols-2">

                {/* LEFT */}

                <div className="bg-orange-500 text-white p-12 flex flex-col justify-between">

                    <div>
                        <h1 className="text-4xl font-bold">
                            🔥 STREAKR
                        </h1>

                        <p className="mt-5 text-base opacity-90">
                            Build habits.
                            <br />
                            One streak at a time.
                        </p>
                    </div>

                    <div className="space-y-5">

                        <div>✔ Complete daily goals</div>

                        <div>🔥 Maintain streaks</div>

                        <div>🏆 Earn XP & Level Up</div>

                        <div>👥 Compete with friends</div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="p-10 flex flex-col justify-center min-h-[520px]">

                    <h2 className="text-4xl font-bold mb-3">

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
                                className="w-full border rounded-xl px-4 py-2.75"
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-xl px-3.5 py-2.5"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-xl px-3.5 py-2.5"
                        />

                        <button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold transition"
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