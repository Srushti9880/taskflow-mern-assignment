import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { TaskColumn } from "../components/TaskColumn";
import { TaskModal } from "../components/TaskModal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PlusIcon, SearchIcon } from "../components/Icons";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { STATUSES } from "../utils/constants";
import { getErrorMessage } from "../utils/helpers";

const SkeletonBoard = () => (
  <div className="board" aria-busy="true" aria-label="Loading tasks">
    {STATUSES.map((s) => (
      <div key={s.value} className={`column tone-${s.tone}`}>
        <div className="skeleton skeleton-head" />
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, loading, error, loadTasks, removeTask } = useTasks();

  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null); // { task?, status? }
  const [taskToDelete, setTaskToDelete] = useState(null);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleTasks = useMemo(() => {
    if (!normalizedQuery) return tasks;
    return tasks.filter(
      (t) => t.title.toLowerCase().includes(normalizedQuery) || t.description?.toLowerCase().includes(normalizedQuery)
    );
  }, [tasks, normalizedQuery]);


  const handleDelete = async () => {
    try {
      await removeTask(taskToDelete._id);
      toast.success("Task deleted");
      setTaskToDelete(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <>
      <Navbar />
      <main className="page">
        <div className="page-head">
          <div>
            <h1>Hi, {user?.name?.split(" ")[0]}</h1>
          </div>
          <div className="page-tools">
            <div className="search">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search tasks"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tasks"
              />
            </div>
            <button className="btn btn-primary" onClick={() => setModal({ status: "To-Do" })}>
              <PlusIcon />
              New task
            </button>
          </div>
        </div>

        {loading ? (
          <SkeletonBoard />
        ) : error ? (
          <div className="error-state">
            <h2>We couldn't load your tasks</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={loadTasks}>
              Try again
            </button>
          </div>
        ) : (
          <div className="board">
            {STATUSES.map((status) => (
              <TaskColumn
                key={status.value}
                status={status}
                tasks={visibleTasks.filter((t) => t.status === status.value)}
                isFiltering={Boolean(normalizedQuery)}
                onAdd={(value) => setModal({ status: value })}
                onEdit={(task) => setModal({ task })}
                onDelete={setTaskToDelete}
              />
            ))}
          </div>
        )}
      </main>

      {modal && <TaskModal task={modal.task} defaultStatus={modal.status} onClose={() => setModal(null)} />}

      {taskToDelete && (
        <ConfirmDialog
          title="Delete this task?"
          message={`"${taskToDelete.title}" will be permanently removed.`}
          confirmLabel="Delete task"
          onConfirm={handleDelete}
          onClose={() => setTaskToDelete(null)}
        />
      )}
    </>
  );
};

export default Dashboard;
