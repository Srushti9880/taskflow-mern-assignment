export const getErrorMessage = (error) => {
  if (!error.response) {
    return error.code === "ECONNABORTED"
      ? "The request timed out. Please try again."
      : "Cannot reach the server. Check that the backend is running.";
  }
  return error.response.data?.message || "Something went wrong. Please try again.";
};

// Converts backend `errors: [{ field, message }]` into `{ field: message }`.
export const getFieldErrors = (error) => {
  const list = error.response?.data?.errors;
  if (!Array.isArray(list)) return {};
  return list.reduce((acc, { field, message }) => {
    if (field && !acc[field]) acc[field] = message;
    return acc;
  }, {});
};

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
