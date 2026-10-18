import mongoose from "mongoose";

export const TASK_STATUSES = ["To-Do", "In-Progress", "Done"];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title must be at most 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Description must be at most 500 characters"],
    },
    status: {
      type: String,
      enum: { values: TASK_STATUSES, message: "Invalid status: {VALUE}" },
      default: "To-Do",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
