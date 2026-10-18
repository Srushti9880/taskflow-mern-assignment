import Task from "../models/taskModel.js";
import ApiError from "../utils/ApiError.js";

// Fetch a task only if it belongs to the logged-in user
const findOwnTask = async (id, userId) => {
  const task = await Task.findOne({ _id: id, userId });
  if (!task) throw new ApiError(404, "Task not found");
  return task;
};

// POST /api/tasks
export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user._id });

  res.status(201).json({
    success: true,
    message: "Task created",
    data: { task },
  });
};

// GET /api/tasks?status=To-Do
export const getTasks = async (req, res) => {
  const filter = { userId: req.user._id };
  if (req.query.status) filter.status = req.query.status;

  const tasks = await Task.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: { tasks },
  });
};

// GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  const task = await findOwnTask(req.params.id, req.user._id);

  res.status(200).json({ success: true, data: { task } });
};

// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  const task = await findOwnTask(req.params.id, req.user._id);

  Object.assign(task, req.body);
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated",
    data: { task },
  });
};

// PATCH /api/tasks/:id/status
export const updateTaskStatus = async (req, res) => {
  const task = await findOwnTask(req.params.id, req.user._id);

  task.status = req.body.status;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task status updated",
    data: { task },
  });
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  const task = await findOwnTask(req.params.id, req.user._id);
  await task.deleteOne();

  res.status(200).json({ success: true, message: "Task deleted" });
};
