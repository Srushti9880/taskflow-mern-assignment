import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { Spinner } from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import { EMAIL_REGEX, getErrorMessage, getFieldErrors } from "../utils/helpers";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Enter your password.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) return setErrors(found);

    setSubmitting(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      toast.success("Welcome back!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const fieldErrors = getFieldErrors(err);
      if (Object.keys(fieldErrors).length) setErrors(fieldErrors);
      toast.error(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Log in"
      subtitle="Pick up where you left off."
      footer={
        <>
          New to TaskFlow? <Link to="/register">Create an account</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />
        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting && <Spinner small />}
          Log in
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
