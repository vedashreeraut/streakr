const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

// Send Friend Request
exports.sendRequest = async (req, res) => {
  try {
    const sender = req.user.id;
    const { receiver } = req.body;

    if (sender === receiver) {
      return res.status(400).json({
        message: "You cannot add yourself.",
      });
    }

    const alreadyFriends = await User.findOne({
      _id: sender,
      friends: receiver,
    });

    if (alreadyFriends) {
      return res.status(400).json({
        message: "Already friends.",
      });
    }

    const existingRequest = await FriendRequest.findOne({
      sender,
      receiver,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent.",
      });
    }

    const request = await FriendRequest.create({
      sender,
      receiver,
    });

    res.status(201).json(request);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Pending Requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      receiver: req.user.id,
      status: "pending",
    })
      .populate("sender", "name email");

    res.json(requests);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Get Users to Add

exports.getUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    // All pending friend requests involving the current user
    const pendingRequests = await FriendRequest.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id },
      ],
      status: "Pending",
    });

    // IDs that should NOT appear in search
    const excludedUsers = new Set();

    // Current user
    excludedUsers.add(req.user.id.toString());

    // Existing friends
    currentUser.friends.forEach((friendId) =>
      excludedUsers.add(friendId.toString())
    );

    // Pending requests (both directions)
    pendingRequests.forEach((request) => {
      excludedUsers.add(request.sender.toString());
      excludedUsers.add(request.receiver.toString());
    });

    const users = await User.find({
      _id: {
        $nin: [...excludedUsers],
      },
    }).select("name email xp streak");

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Accept Friend Request
exports.acceptRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found.",
      });
    }

    request.status = "accepted";
    await request.save();

    await User.findByIdAndUpdate(
      request.sender,
      {
        $addToSet: {
          friends: request.receiver,
        },
      }
    );

    await User.findByIdAndUpdate(
      request.receiver,
      {
        $addToSet: {
          friends: request.sender,
        },
      }
    );

    res.json({
      message: "Friend request accepted.",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Reject Friend Request
exports.rejectRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found.",
      });
    }

    request.status = "rejected";
    await request.save();

    res.json({
      message: "Friend request rejected.",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Get My Friends
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("friends", "name email xp streak");

    res.json(user.friends);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("friends", "name email xp streak");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("name xp streak")
      .sort({
        xp: -1,
        streak: -1,
      });

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};