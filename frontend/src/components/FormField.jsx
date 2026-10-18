import { useState } from "react";
import { EyeIcon } from "./Icons";

export const FormField = ({ label, name, error, hint, type = "text", as = "input", children, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const id = `field-${name}`;
  const Control = as;

  return (
    <div className={`field${error ? " field-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="control">
        <Control
          id={id}
          name={name}
          type={as === "input" ? (isPassword && visible ? "text" : type) : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        >
          {children}
        </Control>
        {isPassword && (
          <button
            type="button"
            className="control-toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            <EyeIcon off={visible} />
          </button>
        )}
      </div>
      {error ? (
        <p className="field-msg" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="field-hint">{hint}</p>
      )}
    </div>
  );
};
