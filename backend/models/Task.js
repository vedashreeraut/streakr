const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Completed"],
      default: "Todo",
    },

    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Private",
    },

    dueDate: Date,

    category: {
      type: String,
      default: "General",
    },

    completedAt: Date,

    createdBy: {
      type: String,
      default: "Anonymous",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);