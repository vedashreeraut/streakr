const Task = require("../models/Task");
const User = require("../models/User");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id, }).sort({
      pinned: -1,
      dueDate: 1,
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      repeat: req.body.repeat,
      isPrivate: req.body.isPrivate,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;

    task.completedAt = task.completed
      ? new Date()
      : null;

    await task.save();
    // Award / Remove XP
    const user = await User.findById(task.user);

    if (task.completed) {

      user.xp += task.xp || 10;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!user.lastCompletedDate) {

        user.streak = 1;

      } else {

        const last = new Date(user.lastCompletedDate);
        last.setHours(0, 0, 0, 0);

        const diff =
          (today - last) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          user.streak += 1;
        } else if (diff > 1) {
          user.streak = 1;
        }

      }

      user.lastCompletedDate = today;

    } else {

      user.xp -= task.xp || 10;

    }

    await user.save();

    if (
      task.completed &&
      task.repeat !== "Never"
    ) {
      let nextDate = null;

      if (task.dueDate) {
        nextDate = new Date(task.dueDate);

        if (task.repeat === "Daily")
          nextDate.setDate(
            nextDate.getDate() + 1
          );

        if (task.repeat === "Weekly")
          nextDate.setDate(
            nextDate.getDate() + 7
          );

        if (task.repeat === "Monthly")
          nextDate.setMonth(
            nextDate.getMonth() + 1
          );
      }

      await Task.create({
        user: task.user,
        title: task.title,
        priority: task.priority,
        dueDate: nextDate,
        repeat: task.repeat,
        isPrivate: task.isPrivate,
        xp: task.xp,
      });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!task)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(task);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.togglePin = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    task.pinned = !task.pinned;

    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getNotificationSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const overdue = await Task.countDocuments({
      user: req.user.id,
      completed: false,
      dueDate: { $lt: today },
    });

    const dueToday = await Task.countDocuments({
      user: req.user.id,
      completed: false,
      dueDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    res.json({
      overdue,
      dueToday,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};