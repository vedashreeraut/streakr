const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({user: req.user.id,}).sort({ pinned: -1,
  dueDate: 1,
  createdAt: -1, });
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