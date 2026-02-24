import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state || [];

  // ✅ Validate and compute career from full 5-question path
  const getCareerFromPath = (answers) => {
    if (!answers || answers.length < 5) {
      return "Assessment Incomplete";
    }

    // final specialization is last answer
    return answers[answers.length - 1];
  };

  const career = getCareerFromPath(answers);

  // ✅ Confidence calculation (simple professional heuristic)
  const confidence =
    answers.length >= 5 ? Math.min(95, 70 + answers.length * 5) : 0;

  // 🎉 Confetti celebration
  useEffect(() => {
    const duration = 1200;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  // ⏳ Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 text-white text-center px-4">
      
      <div className="animate-[fadeIn_0.8s_ease-out]">
        <h2 className="text-3xl mb-4 animate-pulse">
          🎯 Your Best Career
        </h2>

        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          {career}
        </h1>

        {/* ✅ Confidence */}
        {confidence > 0 && (
          <p className="text-lg opacity-95 mb-2">
            Confidence: {confidence}%
          </p>
        )}

        {/* ✅ Path validation message */}
        {answers.length < 5 && (
          <p className="text-yellow-200 mb-2">
            ⚠️ Please complete the full assessment
          </p>
        )}

        <p className="opacity-90">
          Redirecting to dashboard in 5 seconds...
        </p>
      </div>

      {/* Tailwind custom animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}