import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md text-white px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
      
      {/* Logo */}
      <h1 className="text-xl font-bold tracking-wide">
        Career<span className="text-indigo-400">AI</span>
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        {!user ? (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-400 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="hover:text-indigo-400 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="hover:text-indigo-400 transition"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-indigo-600 px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}