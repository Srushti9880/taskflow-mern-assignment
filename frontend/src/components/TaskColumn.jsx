import { useState } from "react";
import { PlusIcon } from "./Icons";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../context/TaskContext";

export const TaskColumn = ({ status, tasks, isFiltering, onAdd, onEdit, onDelete }) => {
  const { moveTask } = useTasks();
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) moveTask(id, status.value);
  };

  return (
    <section
      className={`column tone-${status.tone}${isOver ? " column-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={`${status.label} tasks`}
    >
      <header className="column-head">
        <span className="column-dot" />
        <h2>{status.label}</h2>
        <span className="count">{tasks.length}</span>
        <button className="icon-btn" onClick={() => onAdd(status.value)} aria-label={`Add task to ${status.label}`}>
          <PlusIcon />
        </button>
      </header>

      <div className="column-body">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}

        {tasks.length === 0 && (
          <div className="empty">
            <p>{isFiltering ? "No tasks match your search." : status.empty}</p>
            {!isFiltering && (
              <button className="btn btn-ghost btn-sm" onClick={() => onAdd(status.value)}>
                <PlusIcon />
                Add task
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
