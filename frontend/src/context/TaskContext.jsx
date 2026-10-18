import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import * as taskApi from "../api/taskApi";
import { getErrorMessage } from "../utils/helpers";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setTasks(await taskApi.fetchTasks());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Create / edit / delete throw on failure so the calling form can show field errors.
  const addTask = useCallback(async (payload) => {
    const task = await taskApi.createTask(payload);
    setTasks((prev) => [task, ...prev]);
    return task;
  }, []);

  const editTask = useCallback(async (id, payload) => {
    const task = await taskApi.updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? task : t)));
    return task;
  }, []);

  const removeTask = useCallback(async (id) => {
    await taskApi.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }, []);

  // Optimistic move: update the UI immediately, roll back if the API fails.
  const moveTask = useCallback(
    async (id, status) => {
      const current = tasks.find((t) => t._id === id);
      if (!current || current.status === status) return;
      const previousStatus = current.status;

      setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
      try {
        const saved = await taskApi.updateTaskStatus(id, status);
        setTasks((prev) => prev.map((t) => (t._id === id ? saved : t)));
      } catch (err) {
        setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status: previousStatus } : t)));
        toast.error(getErrorMessage(err));
      }
    },
    [tasks]
  );

  const value = useMemo(
    () => ({ tasks, loading, error, loadTasks, addTask, editTask, removeTask, moveTask }),
    [tasks, loading, error, loadTasks, addTask, editTask, removeTask, moveTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
};
