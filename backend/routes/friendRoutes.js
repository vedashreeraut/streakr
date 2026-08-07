const express = require("express");
const router = express.Router();
const {
  sendRequest,
  getPendingRequests,
  getUsers,
  getFriends,
  acceptRequest,
  rejectRequest,
  getUserProfile,
  getLeaderboard,
} = require("../controllers/friendController");
const auth = require("../middleware/authMiddleware");

router.post("/request", auth, sendRequest);

router.get("/requests", auth, getPendingRequests);
router.get("/users", auth, getUsers);
router.get("/myfriends", auth, getFriends);
router.post("/accept/:id", auth, acceptRequest);

router.post("/reject/:id", auth, rejectRequest);
router.get("/profile/:id", auth, getUserProfile);
router.get(
  "/leaderboard",
  auth,
  getLeaderboard
);

module.exports = router;