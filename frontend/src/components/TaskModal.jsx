import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "./Modal";
import { FormField } from "./FormField";
import { Spinner } from "./Spinner";
import { useTasks } from "../context/TaskContext";
import { DESCRIPTION_MAX, STATUSES, TITLE_MAX } from "../utils/constants";
import { getErrorMessage, getFieldErrors } from "../utils/helpers";

// Used for both creating (task = null) and editing (task = existing task).
export const TaskModal = ({ task, defaultStatus = "To-Do", onClose }) => {
  const { addTask, editTask } = useTasks();
  const isEdit = Boolean(task);

  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || defaultStatus,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Give the task a title.";
    else if (form.title.trim().length > TITLE_MAX) next.title = `Title can be at most ${TITLE_MAX} characters.`;
    if (form.description.length > DESCRIPTION_MAX)
      next.description = `Description can be at most ${DESCRIPTION_MAX} characters.`;
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) return setErrors(found);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
    };

    setSubmitting(true);
    try {
      if (isEdit) {
        await editTask(task._id, payload);
        toast.success("Task updated");
      } else {
        await addTask(payload);
        toast.success("Task created");
      }
      onClose();
    } catch (err) {
      const fieldErrors = getFieldErrors(err);
      if (Object.keys(fieldErrors).length) setErrors(fieldErrors);
      else toast.error(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <Modal title={isEdit ? "Edit task" : "New task"} onClose={submitting ? () => {} : onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g. Prepare sprint demo"
          autoFocus
          autoComplete="off"
        />
        <FormField
          label="Description"
          name="description"
          as="textarea"
          rows={4}
          value={form.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Add details, links or acceptance notes (optional)"
          hint={`${form.description.length}/${DESCRIPTION_MAX}`}
        />
        <FormField label="Status" name="status" as="select" value={form.status} onChange={handleChange} error={errors.status}>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </FormField>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting && <Spinner small />}
            {isEdit ? "Save changes" : "Create task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
