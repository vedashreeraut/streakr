const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const app = express();

const friendRoutes = require("./routes/friendRoutes");
const auth = require("./middleware/authMiddleware");

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/api/friends", friendRoutes);


const PORT = 3001;
const HOST = "127.0.0.1";

console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

app.get("/protected", auth, (req, res) => {
  res.json({
    message: "Protected route works!",
    user: req.user,
  });
});