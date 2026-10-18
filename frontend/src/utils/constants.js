export const TOKEN_KEY = "taskflow_token";

// `value` must match the backend enum exactly.
export const STATUSES = [
  { value: "To-Do", label: "To Do", tone: "todo", empty: "Nothing waiting. Add your next task." },
  { value: "In-Progress", label: "In Progress", tone: "progress", empty: "Drag a task here when you start it." },
  { value: "Done", label: "Done", tone: "done", empty: "Finished tasks will land here." },
];

export const TITLE_MAX = 100;
export const DESCRIPTION_MAX = 500;
