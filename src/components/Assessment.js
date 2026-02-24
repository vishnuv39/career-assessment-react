import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= DECISION TREE ================= */

const questionTree = {
  // ===== LEVEL 1 =====
  start: {
    q: "Which field interests you most?",
    options: [
      { text: "Technology", next: "tech2" },
      { text: "Medical", next: "med2" },
      { text: "Business", next: "bus2" },
      { text: "Arts", next: "arts2" },
    ],
  },

  /* ================= TECHNOLOGY ================= */

  tech2: {
    q: "What type of tech problems excite you?",
    options: [
      { text: "Building software products", next: "tech3_soft" },
      { text: "Working with data & intelligence", next: "tech3_ai" },
    ],
  },

  // ---- SOFTWARE PATH
  tech3_soft: {
    q: "Which part of software do you enjoy more?",
    options: [
      { text: "User interfaces & visuals", next: "tech4_ui" },
      { text: "Server logic & systems", next: "tech4_backend" },
    ],
  },

  tech4_ui: {
    q: "What describes you best?",
    options: [
      { text: "Creative & design-oriented", next: "tech5_ui" },
      { text: "Detail-focused builder", next: "tech5_ui" },
    ],
  },

  tech5_ui: {
    q: "Which role fits you most?",
    options: [
      { text: "Frontend Engineer", next: "result" },
      { text: "UI Engineer", next: "result" },
    ],
  },

  tech4_backend: {
    q: "Which backend area interests you?",
    options: [
      { text: "APIs & application logic", next: "tech5_backend" },
      { text: "Databases & scalability", next: "tech5_backend" },
    ],
  },

  tech5_backend: {
    q: "Which role fits you most?",
    options: [
      { text: "Backend Engineer", next: "result" },
      { text: "Full Stack Engineer", next: "result" },
    ],
  },

  // ---- AI PATH
  tech3_ai: {
    q: "What attracts you more?",
    options: [
      { text: "Analyzing data patterns", next: "tech4_data" },
      { text: "Building intelligent models", next: "tech4_ml" },
    ],
  },

  tech4_data: {
    q: "Your strongest trait?",
    options: [
      { text: "Statistics & insights", next: "tech5_data" },
      { text: "Visualization & storytelling", next: "tech5_data" },
    ],
  },

  tech5_data: {
    q: "Which role fits you most?",
    options: [
      { text: "Data Analyst", next: "result" },
      { text: "Data Scientist", next: "result" },
    ],
  },

  tech4_ml: {
    q: "What excites you most?",
    options: [
      { text: "Training ML models", next: "tech5_ml" },
      { text: "Deploying AI systems", next: "tech5_ml" },
    ],
  },

  tech5_ml: {
    q: "Which role fits you most?",
    options: [
      { text: "ML Engineer", next: "result" },
      { text: "AI Engineer", next: "result" },
    ],
  },

  /* ================= MEDICAL ================= */

  med2: {
    q: "Which aspect of medicine interests you?",
    options: [
      { text: "Treating patients directly", next: "med3_clinical" },
      { text: "Medical discovery & testing", next: "med3_research" },
    ],
  },

  med3_clinical: {
    q: "Which environment do you prefer?",
    options: [
      { text: "General patient care", next: "med4_phys" },
      { text: "Surgical procedures", next: "med4_surg" },
    ],
  },

  med4_phys: {
    q: "Your natural strength?",
    options: [
      { text: "Patient communication", next: "med5_phys" },
      { text: "Diagnosis & treatment", next: "med5_phys" },
    ],
  },

  med5_phys: {
    q: "Best career match?",
    options: [
      { text: "General Physician", next: "result" },
      { text: "Specialist Doctor", next: "result" },
    ],
  },

  med4_surg: {
    q: "What suits you most?",
    options: [
      { text: "Precision procedures", next: "med5_surg" },
      { text: "High-pressure operations", next: "med5_surg" },
    ],
  },

  med5_surg: {
    q: "Best career match?",
    options: [
      { text: "Surgeon", next: "result" },
      { text: "Surgical Specialist", next: "result" },
    ],
  },

  med3_research: {
    q: "Which research area attracts you?",
    options: [
      { text: "Drug & pharmaceutical research", next: "med4_research" },
      { text: "Medical imaging & diagnostics", next: "med4_research" },
    ],
  },

  med4_research: {
    q: "Your key strength?",
    options: [
      { text: "Lab experimentation", next: "med5_research" },
      { text: "Analytical investigation", next: "med5_research" },
    ],
  },

  med5_research: {
    q: "Best career match?",
    options: [
      { text: "Medical Researcher", next: "result" },
      { text: "Radiologist", next: "result" },
    ],
  },

  /* ================= BUSINESS ================= */

  bus2: {
    q: "What excites you most in business?",
    options: [
      { text: "Building new ventures", next: "bus3_startup" },
      { text: "Managing large organizations", next: "bus3_corp" },
    ],
  },

  bus3_startup: {
    q: "Which role appeals to you?",
    options: [
      { text: "Creating new products", next: "bus4_startup" },
      { text: "Growing the business", next: "bus4_startup" },
    ],
  },

  bus4_startup: {
    q: "Your strongest trait?",
    options: [
      { text: "Risk taking", next: "bus5_startup" },
      { text: "Innovation mindset", next: "bus5_startup" },
    ],
  },

  bus5_startup: {
    q: "Best career match?",
    options: [
      { text: "Startup Founder", next: "result" },
      { text: "Product Manager", next: "result" },
    ],
  },

  bus3_corp: {
    q: "Which corporate function interests you?",
    options: [
      { text: "Operations & execution", next: "bus4_corp" },
      { text: "Marketing & growth", next: "bus4_corp" },
    ],
  },

  bus4_corp: {
    q: "Your natural strength?",
    options: [
      { text: "Leadership", next: "bus5_corp" },
      { text: "Communication", next: "bus5_corp" },
    ],
  },

  bus5_corp: {
    q: "Best career match?",
    options: [
      { text: "Operations Manager", next: "result" },
      { text: "Marketing Manager", next: "result" },
    ],
  },

  /* ================= ARTS ================= */

  arts2: {
    q: "Which creative direction attracts you?",
    options: [
      { text: "Visual design", next: "arts3_design" },
      { text: "Animation & motion", next: "arts3_anim" },
    ],
  },

  arts3_design: {
    q: "What type of design do you enjoy?",
    options: [
      { text: "User experience design", next: "arts4_design" },
      { text: "Brand & graphic design", next: "arts4_design" },
    ],
  },

  arts4_design: {
    q: "Your strongest trait?",
    options: [
      { text: "User empathy", next: "arts5_design" },
      { text: "Visual creativity", next: "arts5_design" },
    ],
  },

  arts5_design: {
    q: "Best career match?",
    options: [
      { text: "UI/UX Designer", next: "result" },
      { text: "Graphic Designer", next: "result" },
    ],
  },

  arts3_anim: {
    q: "Which animation style excites you?",
    options: [
      { text: "2D storytelling", next: "arts4_anim" },
      { text: "3D world building", next: "arts4_anim" },
    ],
  },

  arts4_anim: {
    q: "Your key strength?",
    options: [
      { text: "Storyboarding", next: "arts5_anim" },
      { text: "Motion dynamics", next: "arts5_anim" },
    ],
  },

  arts5_anim: {
    q: "Best career match?",
    options: [
      { text: "2D Animator", next: "result" },
      { text: "3D Animator", next: "result" },
    ],
  },
};
/* ================= COMPONENT ================= */

export default function Assessment() {
  const navigate = useNavigate();
  const [path, setPath] = useState(["start"]);
  const [answers, setAnswers] = useState([]);

  const currentKey = path[path.length - 1];
  const currentQuestion = questionTree[currentKey];
  const step = path.length - 1;
  const progress = (path.length / 5) * 100;

  const handleSelect = (option) => {
    const updated = [...answers];
    updated[step] = option.text;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (!answers[step]) return alert("Please select an option");

    const selected = currentQuestion.options.find(
      (o) => o.text === answers[step]
    );

    if (selected.next === "result") {
      navigate("/result", { state: answers });
    } else {
      setPath([...path, selected.next]);
    }
  };

  const handlePrev = () => {
    if (path.length === 1) navigate("/dashboard");
    else setPath(path.slice(0, -1));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 px-4">
      
      {/* Progress */}
      <div className="w-full max-w-xl mb-6">
        <div className="w-full bg-white/30 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-center mt-2">
          Question {step + 1} of 5
        </p>
      </div>

      {/* Card */}
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-xl w-full text-center">
        <h2 className="text-2xl font-semibold mb-6">
          {currentQuestion.q}
        </h2>

        <div className="grid gap-3 mb-6">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`p-3 rounded-lg border transition ${
                answers[step] === opt.text
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "hover:bg-indigo-50"
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            className="px-6 py-2 rounded-lg bg-gray-200"
          >
            {path.length === 1 ? "Back" : "Previous"}
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white"
          >
            {path.length === 5 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}