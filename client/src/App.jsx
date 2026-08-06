import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Friends from "./pages/Friends";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Achievements from "./pages/Achievements";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />

      <Route path="/auth" element={<Auth />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/friends" element={<Friends />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/settings" element={<Settings />} />


      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/notifications"
        element={<Notifications />}
      />
      <Route
        path="/achievements"
        element={<Achievements />}
      />

    </Routes>
  );
}

export default App;