import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API } from "../api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [mobile, setMobile] = useState("");
  const [qualification, setQualification] = useState("");
  const [university, setUniversity] = useState("");
  const [gpa, setGpa] = useState("");
  const { showNotification } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !profession || !mobile || !qualification || !university || !gpa) {
      showNotification("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(API.signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          profession,
          mobile,
          qualification,
          university,
          gpa
        })
      });

      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.message);
      }

      showNotification("Signup successful");
      navigate("/login");
    } catch (err) {
      showNotification(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden py-8 px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4 shadow-2xl">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join CareerAI</h1>
          <p className="text-white/80">Create your account and start your career journey</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-white/60 text-sm mt-1">Fill in your details to get started</p>
          </div>

          {/* Account Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="bg-blue-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-white/50">📧</span>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-white/50">🔒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="bg-green-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profession */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Current Profession *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Student, Developer, Designer"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    onChange={(e) => setProfession(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-white/50">💼</span>
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-white/50">📱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="bg-purple-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Education Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Qualification */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Highest Qualification *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Bachelor's in Computer Science"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    onChange={(e) => setQualification(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-white/50">🎓</span>
                  </div>
                </div>
              </div>

              {/* University */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  University/College *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter university name"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-white/50">🏛️</span>
                  </div>
                </div>
              </div>

              {/* GPA */}
              <div className="md:col-span-2">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  GPA/Grade *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., 3.8/4.0 or First Class"
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    onChange={(e) => setGpa(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-white/50">📊</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white p-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg mb-6"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white/70">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-white font-semibold hover:text-green-200 transition-colors underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}