import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [currentFeature, setCurrentFeature] = useState(0);

  const handleStart = () => {
    if (user) navigate("/dashboard");
    else navigate("/login");
  };

  const features = [
    {
      icon: "🎯",
      title: "AI-Powered Assessment",
      description: "Advanced algorithms analyze your responses for accurate career matching"
    },
    {
      icon: "⚡",
      title: "Quick & Easy",
      description: "Complete your assessment in just 2 minutes with our streamlined process"
    },
    {
      icon: "📊",
      title: "Detailed Insights",
      description: "Get comprehensive career recommendations with confidence scores"
    },
    {
      icon: "🚀",
      title: "Career Growth",
      description: "Discover paths that align with your skills, interests, and goals"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-40 right-40 w-48 h-48 bg-yellow-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          {user && (
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                <span className="text-2xl">👋</span>
                <span className="text-white font-medium">Welcome back, {user.email?.split('@')[0]}!</span>
              </div>
            </div>
          )}

          {/* Main Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-6 shadow-2xl">
              <span className="text-4xl">🎯</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Perfect Career
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Take our AI-powered career assessment and unlock personalized career recommendations in just 2 minutes
            </p>

            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              {user ? "Go to Dashboard" : "Start Assessment"}
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-white/70">Career Assessments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-white/70">Accuracy Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-white">2 min</div>
              <div className="text-white/70">Average Time</div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Why Choose CareerAI?</h2>

            {/* Rotating Features */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFeature ? 'bg-white scale-125' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <div className="text-center">
                <div className="text-6xl mb-4">{features[currentFeature].icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{features[currentFeature].title}</h3>
                <p className="text-white/80 text-lg max-w-md mx-auto">{features[currentFeature].description}</p>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Find Your Dream Career?</h3>
              <p className="text-white/80 mb-6">Join thousands of users who have discovered their perfect career path</p>
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
              >
                {user ? "Continue Your Journey" : "Get Started Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}