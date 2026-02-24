import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleStart = () => {
    if (user) navigate("/dashboard");
    else navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 text-white text-center px-4">
      
      <h1 className="text-5xl font-bold mb-4">
        AI Career Assessment
      </h1>

      <p className="mb-8 text-lg opacity-90">
        Discover your perfect career path in 2 minutes
      </p>

      <button
        onClick={handleStart}
        className="bg-indigo-600 px-8 py-4 rounded-xl text-lg hover:bg-indigo-700 transition shadow-lg hover:scale-105 active:scale-95"
      >
        Get Started
      </button>
    </div>
  );
}