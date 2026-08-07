const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");


const {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
  togglePin,
  getNotificationSummary,
} = require("../controllers/taskController");

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.patch("/:id", auth, toggleTask);
router.delete("/:id", auth, deleteTask);
router.put("/:id", auth, updateTask);
router.patch("/:id/pin", auth, togglePin);
router.get(
  "/notifications",
  auth,
  getNotificationSummary
);

module.exports = router;