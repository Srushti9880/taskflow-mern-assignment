import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FullPageSpinner } from "./Spinner";

export const ProtectedRoute = ({ children }) => {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return <FullPageSpinner />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

// Logged-in users have no reason to see the login / register pages.
export const PublicRoute = ({ children }) => {
  const { user, initializing } = useAuth();

  if (initializing) return <FullPageSpinner />;
  if (user) return <Navigate to="/" replace />;
  return children;
};
