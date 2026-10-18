export const Spinner = ({ small }) => (
  <span className={`spinner${small ? " spinner-sm" : ""}`} role="status" aria-label="Loading" />
);

export const FullPageSpinner = () => (
  <div className="fullpage-center">
    <Spinner />
  </div>
);
