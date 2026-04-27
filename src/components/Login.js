import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const { login, showNotification } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      showNotification("Enter email and password");
      return;
    }

    try {
      const res = await fetch(API.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message); // ✅ backend message
      }
      login(data);
      navigate("/dashboard");

    } catch (err) {
      showNotification(err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email || !newPassword) {
      showNotification("Enter your email and a new password");
      return;
    }

    try {
      const res = await fetch(API.forgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Unable to reset password");
      }

      showNotification("Password updated successfully. Please log in.");
      setForgotMode(false);
      setPassword("");
      setNewPassword("");
    } catch (err) {
      showNotification(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4 shadow-2xl">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/80">Sign in to continue your career journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">CareerAI Login</h2>
            <p className="text-white/60 text-sm mt-1">Enter your credentials to access</p>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-white/50 text-lg">📧</span>
              </div>
            </div>
          </div>

          {/* Password / New Password Field */}
          <div className="mb-8">
            <label className="block text-white/80 text-sm font-medium mb-2">
              {forgotMode ? "New Password" : "Password"}
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder={forgotMode ? "Enter your new password" : "Enter your password"}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                value={forgotMode ? newPassword : password}
                onChange={(e) => {
                  if (forgotMode) {
                    setNewPassword(e.target.value);
                  } else {
                    setPassword(e.target.value);
                  }
                }}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-white/50 text-lg">🔒</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={forgotMode ? handleResetPassword : handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg mb-6"
          >
            {forgotMode ? "Reset Password" : "Sign In"}
          </button>

          {/* Sign Up / Forgot Password Links */}
          <div className="text-center mt-6 space-y-3">
            {forgotMode ? (
              <button
                onClick={() => setForgotMode(false)}
                className="text-white font-semibold hover:text-blue-200 transition-colors underline"
              >
                Back to sign in
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setForgotMode(true)}
                  className="text-white font-semibold hover:text-blue-200 transition-colors underline"
                >
                  Forgot password?
                </button>
                <p className="text-white/70">
                  Don't have an account? 
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-white font-semibold hover:text-blue-200 transition-colors underline"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}