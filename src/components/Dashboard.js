import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API } from "../api";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalAssessments: 0, latestCareer: null, averageConfidence: 0 });

  useEffect(() => {
    if (user) {
      fetch(API.getResults(user.email))
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            const latest = data[data.length - 1];
            const avg = data.reduce((sum, r) => sum + r.confidence, 0) / data.length;

            setStats({
              totalAssessments: data.length,
              latestCareer: latest.career,
              averageConfidence: Math.round(avg)
            });
          }
        });
    }
  }, [user]);

  const quickActions = [
    {
      icon: "🎯",
      title: "Take Assessment",
      description: "Discover your career path",
      action: () => navigate("/assessment"),
      color: "from-blue-500 to-indigo-600",
      hoverColor: "hover:from-blue-600 hover:to-indigo-700"
    },
    {
      icon: "📊",
      title: "View Results",
      description: "See your assessment history",
      action: () => navigate("/results"),
      color: "from-green-500 to-teal-600",
      hoverColor: "hover:from-green-600 hover:to-teal-700"
    },
    {
      icon: "👤",
      title: "Update Profile",
      description: "Manage your account",
      action: () => navigate("/profile"),
      color: "from-purple-500 to-pink-600",
      hoverColor: "hover:from-purple-600 hover:to-pink-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {user?.email?.split('@')[0]}! 👋
                </h1>
                <p className="text-white/70">Ready to explore your career potential?</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-right">
                  <div className="text-white/60 text-sm">Member since</div>
                  <div className="text-white font-semibold">
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {stats.totalAssessments > 0 && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Total Assessments</div>
                    <div className="text-2xl font-bold text-white">{stats.totalAssessments}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Latest Career</div>
                    <div className="text-lg font-bold text-white truncate">{stats.latestCareer || 'Not assessed'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-xl">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Avg Confidence</div>
                    <div className="text-2xl font-bold text-white">{stats.averageConfidence}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">What would you like to do?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`group bg-gradient-to-r ${action.color} ${action.hoverColor} rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                      {action.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {action.description}
                    </p>
                    <div className="mt-4 flex items-center text-white/70 text-sm group-hover:text-white transition-colors">
                      <span>Get started</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              "The best way to predict the future is to create it."
            </h3>
            <p className="text-white/70 mb-6">- Peter Drucker</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full text-white">✨ AI-Powered</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-white">⚡ Quick Results</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-white">🎯 Personalized</span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-white">🚀 Career Growth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}