import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const publicNavLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/login", label: "Login", icon: "🔐" },
    { path: "/signup", label: "Sign Up", icon: "✨" }
  ];

  const privateNavLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/results", label: "Results", icon: "📈" },
    { path: "/profile", label: "Profile", icon: "👤" }
  ];

  const navLinks = user ? privateNavLinks : publicNavLinks;

  return (
    <nav className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md text-white border-b border-white/10 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                <span className="text-xl font-bold">🎯</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Career<span className="text-indigo-400">AI</span>
              </h1>
              <p className="text-xs text-white/60 -mt-1">AI-Powered Career Guidance</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActiveLink(link.path)
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg border border-blue-400/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10 hover:shadow-md'
                }`}
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {user && (
              <div className="ml-6 flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-xl border border-white/20">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-7 h-7 rounded-full object-cover border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white/20">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-white/90 hidden lg:block">
                    {user.email?.split('@')[0]}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg border border-white/20"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">🚪</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all duration-300 border border-white/20"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 mt-2">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActiveLink(link.path)
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg border border-blue-400/30'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}

              {user && (
                <>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center space-x-3 px-4 py-3 text-white/80">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white/20">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-white">{user.email?.split('@')[0]}</div>
                      <div className="text-xs text-white/60">{user.profession || 'Career Explorer'}</div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}