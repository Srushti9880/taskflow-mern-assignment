import api from "./axios";

export const fetchTasks = () => api.get("/tasks").then((r) => r.data.data.tasks);
export const createTask = (payload) => api.post("/tasks", payload).then((r) => r.data.data.task);
export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload).then((r) => r.data.data.task);
export const updateTaskStatus = (id, status) =>
  api.patch(`/tasks/${id}/status`, { status }).then((r) => r.data.data.task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
