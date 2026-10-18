import { useState } from "react";
import { EditIcon, TrashIcon } from "./Icons";
import { useTasks } from "../context/TaskContext";
import { STATUSES } from "../utils/constants";
import { formatDate } from "../utils/helpers";

export const TaskCard = ({ task, onEdit, onDelete }) => {
  const { moveTask } = useTasks();
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task._id);
    e.dataTransfer.effectAllowed = "move";
    setDragging(true);
  };

  return (
    <article
      className={`card${dragging ? " card-dragging" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setDragging(false)}
    >
      <div className="card-top">
        <h3 className="card-title">{task.title}</h3>
        <div className="card-actions">
          <button className="icon-btn" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}>
            <EditIcon />
          </button>
          <button className="icon-btn icon-btn-danger" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}>
            <TrashIcon />
          </button>
        </div>
      </div>

      {task.description && <p className="card-desc">{task.description}</p>}

      <div className="card-foot">
        <time dateTime={task.createdAt}>{formatDate(task.createdAt)}</time>
        <label className="move">
          <span className="sr-only">Move {task.title} to</span>
          <select value={task.status} onChange={(e) => moveTask(task._id, e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </article>
  );
};
