const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// Root check
app.get("/", (req, res) => {
  res.send("Task Manager Backend Running");
});

// Get all tasks


// Add task


// Delete task


app.use("/tasks", taskRoutes);

const PORT = 3001;
const HOST = "127.0.0.1";

console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
