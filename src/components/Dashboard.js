import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 px-4">
      
      {/* Glass Card */}
      <div className="bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center">
        
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Career Assessment
        </h1>

        <button
          onClick={() => navigate("/assessment")}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-indigo-700 transition shadow-md hover:scale-105 active:scale-95"
        >
          Start Assessment
        </button>

      </div>
    </div>
  );
}