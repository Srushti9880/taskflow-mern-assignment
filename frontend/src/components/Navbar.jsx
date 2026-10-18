import { useAuth } from "../context/AuthContext";
import { LogoMark, LogoutIcon } from "./Icons";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <LogoMark />
          <span>TaskFlow</span>
        </div>
        <div className="navbar-user">
          <span className="avatar" aria-hidden="true">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
          <span className="navbar-name">{user?.name}</span>
          <button className="btn btn-ghost btn-sm" onClick={logout}>
            <LogoutIcon />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
