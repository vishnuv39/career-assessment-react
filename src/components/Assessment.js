import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= ASSESSMENT SECTIONS ================= */

const sections = [
  {
    name: "Technical Skills",
    icon: "💻",
    color: "from-blue-400 to-indigo-500",
    questions: [
      {
        q: "Which task would you naturally continue without interruption?",
        options: [
          { text: "Refining system performance", scores: { "Backend Engineer": 5 } },
          { text: "Designing interactive interfaces", scores: { "Frontend Engineer": 5 } },
          { text: "Extracting insights from data", scores: { "Data Scientist": 5 } },
          { text: "Building complete applications", scores: { "Full Stack Engineer": 5 } }
        ]
      },
      {
        q: "Which approach feels most intuitive?",
        options: [
          { text: "Structured logic", scores: { "Backend Engineer": 5 } },
          { text: "Pattern exploration", scores: { "Data Analyst": 5 } },
          { text: "Predictive modeling", scores: { "ML Engineer": 5 } },
          { text: "Intelligent systems", scores: { "AI Engineer": 5 } }
        ]
      },
      {
        q: "Which environment feels engaging?",
        options: [
          { text: "System architecture", scores: { "Backend Engineer": 5 } },
          { text: "User experience", scores: { "UI/UX Designer": 5 } },
          { text: "Visual design", scores: { "Graphic Designer": 5 } },
          { text: "End-to-end dev", scores: { "Full Stack Engineer": 5 } }
        ]
      },
      {
        q: "Select tasks you resonate with",
        multi: true,
        options: [
          { text: "Debugging systems", scores: { "Backend Engineer": 3 } },
          { text: "Designing layouts", scores: { "UI/UX Designer": 3 } },
          { text: "Analyzing data", scores: { "Data Scientist": 3 } },
          { text: "Building apps", scores: { "Full Stack Engineer": 3 } }
        ]
      },
      {
        q: "Which challenge attracts you most?",
        options: [
          { text: "Backend efficiency", scores: { "Backend Engineer": 5 } },
          { text: "User interaction", scores: { "Frontend Engineer": 5 } },
          { text: "Prediction systems", scores: { "ML Engineer": 5 } },
          { text: "AI solutions", scores: { "AI Engineer": 5 } }
        ]
      }
    ]
  },

  {
    name: "Communication Skills",
    icon: "💬",
    color: "from-green-400 to-teal-500",
    questions: [
      {
        q: "In a team, what role feels natural?",
        options: [
          { text: "Planning structure", scores: { "Product Manager": 5 } },
          { text: "Influencing people", scores: { "Marketing Manager": 5 } },
          { text: "Managing execution", scores: { "Operations Manager": 5 } },
          { text: "Silent execution", scores: { "Backend Engineer": 3 } }
        ]
      },
      {
        q: "Which interaction suits you?",
        options: [
          { text: "Presenting ideas", scores: { "Marketing Manager": 5 } },
          { text: "Aligning teams", scores: { "Product Manager": 5 } },
          { text: "Coordinating ops", scores: { "Operations Manager": 5 } },
          { text: "Independent work", scores: { "Data Scientist": 3 } }
        ]
      },
      {
        q: "Select scenarios you enjoy",
        multi: true,
        options: [
          { text: "Leading discussions", scores: { "Product Manager": 3 } },
          { text: "Convincing people", scores: { "Marketing Manager": 3 } },
          { text: "Organizing work", scores: { "Operations Manager": 3 } },
          { text: "Analyzing quietly", scores: { "Data Analyst": 3 } }
        ]
      },
      {
        q: "Your communication style?",
        options: [
          { text: "Persuasive", scores: { "Marketing Manager": 5 } },
          { text: "Strategic", scores: { "Product Manager": 5 } },
          { text: "Structured", scores: { "Operations Manager": 5 } },
          { text: "Minimal", scores: { "Backend Engineer": 3 } }
        ]
      },
      {
        q: "What energizes you?",
        options: [
          { text: "Driving product vision", scores: { "Product Manager": 5 } },
          { text: "Market impact", scores: { "Marketing Manager": 5 } },
          { text: "Efficient systems", scores: { "Operations Manager": 5 } },
          { text: "Behind-the-scenes work", scores: { "Data Analyst": 3 } }
        ]
      }
    ]
  },

  {
    name: "Mental Ability",
    icon: "🧠",
    color: "from-purple-400 to-pink-500",
    questions: [
      {
        q: "Which problem type engages you?",
        options: [
          { text: "System design", scores: { "Backend Engineer": 5 } },
          { text: "Pattern detection", scores: { "Data Scientist": 5 } },
          { text: "Abstract logic", scores: { "ML Engineer": 5 } },
          { text: "Decision systems", scores: { "AI Engineer": 5 } }
        ]
      },
      {
        q: "Thinking approach?",
        options: [
          { text: "Sequential", scores: { "Backend Engineer": 5 } },
          { text: "Analytical", scores: { "Data Scientist": 5 } },
          { text: "Experimental", scores: { "Startup Founder": 5 } },
          { text: "Creative", scores: { "Frontend Engineer": 5 } }
        ]
      },
      {
        q: "Select mental activities",
        multi: true,
        options: [
          { text: "Numbers", scores: { "Data Analyst": 3 } },
          { text: "Logic", scores: { "ML Engineer": 3 } },
          { text: "Creativity", scores: { "UI/UX Designer": 3 } },
          { text: "Decisions", scores: { "Product Manager": 3 } }
        ]
      },
      {
        q: "Which task feels natural?",
        options: [
          { text: "Algorithms", scores: { "ML Engineer": 5 } },
          { text: "Trends", scores: { "Data Analyst": 5 } },
          { text: "Systems", scores: { "Backend Engineer": 5 } },
          { text: "Designing UX", scores: { "UI/UX Designer": 5 } }
        ]
      },
      {
        q: "Which appeals more?",
        options: [
          { text: "Data uncertainty", scores: { "Data Scientist": 5 } },
          { text: "Logical frameworks", scores: { "Backend Engineer": 5 } },
          { text: "User experiences", scores: { "Frontend Engineer": 5 } },
          { text: "AI experiments", scores: { "AI Engineer": 5 } }
        ]
      }
    ]
  },

  {
    name: "Personality & Interests",
    icon: "🎯",
    color: "from-orange-400 to-red-500",
    questions: [
      {
        q: "Which situation feels fulfilling?",
        options: [
          { text: "New ventures", scores: { "Startup Founder": 5 } },
          { text: "User experience design", scores: { "UI/UX Designer": 5 } },
          { text: "Helping patients", scores: { "General Physician": 5 } },
          { text: "Scientific research", scores: { "Medical Researcher": 5 } }
        ]
      },
      {
        q: "What drives you?",
        options: [
          { text: "Innovation", scores: { "Startup Founder": 5 } },
          { text: "Creativity", scores: { "Graphic Designer": 5 } },
          { text: "Accuracy", scores: { "Radiologist": 5 } },
          { text: "Human impact", scores: { "General Physician": 5 } }
        ]
      },
      {
        q: "Select what resonates",
        multi: true,
        options: [
          { text: "Building systems", scores: { "Full Stack Engineer": 3 } },
          { text: "Leading work", scores: { "Product Manager": 3 } },
          { text: "Helping people", scores: { "General Physician": 3 } },
          { text: "Researching", scores: { "Medical Researcher": 3 } }
        ]
      },
      {
        q: "Closest identity?",
        options: [
          { text: "Innovator", scores: { "Startup Founder": 5 } },
          { text: "Creator", scores: { "UI/UX Designer": 5 } },
          { text: "Analyzer", scores: { "Data Scientist": 5 } },
          { text: "Healer", scores: { "General Physician": 5 } }
        ]
      },
      {
        q: "Meaningful path?",
        options: [
          { text: "Building products", scores: { "Full Stack Engineer": 5 } },
          { text: "Designing visuals", scores: { "Graphic Designer": 5 } },
          { text: "Scientific work", scores: { "Medical Researcher": 5 } },
          { text: "Diagnostics", scores: { "Radiologist": 5 } }
        ]
      }
    ]
  }
];

/* ================= COMPONENT ================= */

export default function Assessment() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [selections, setSelections] = useState({});

  const section = sections[currentSection];
  const question = section.questions[currentQuestion];
  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const currentQuestionIndex = sections.slice(0, currentSection).reduce((sum, s) => sum + s.questions.length, 0) + currentQuestion + 1;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const handleSelect = (optionIndex, isMulti) => {
    if (isMulti) {
      const currentSelections = selections[`${currentSection}-${currentQuestion}`] || [];
      const newSelections = currentSelections.includes(optionIndex)
        ? currentSelections.filter(i => i !== optionIndex)
        : [...currentSelections, optionIndex];
      setSelections({ ...selections, [`${currentSection}-${currentQuestion}`]: newSelections });
    } else {
      setSelections({ ...selections, [`${currentSection}-${currentQuestion}`]: [optionIndex] });
    }
  };

  const handleNext = () => {
    const currentSelections = selections[`${currentSection}-${currentQuestion}`] || [];
    if (currentSelections.length === 0) return alert("Please select an option");

    // Add scores
    const newScores = { ...scores };
    currentSelections.forEach(index => {
      const option = question.options[index];
      Object.entries(option.scores).forEach(([career, points]) => {
        newScores[career] = (newScores[career] || 0) + points;
      });
    });
    setScores(newScores);

    // Move to next
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      navigate("/result", { state: { scores: newScores } });
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    } else {
      navigate("/dashboard");
    }
  };

  const currentSelections = selections[`${currentSection}-${currentQuestion}`] || [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 px-4 py-8">
      
      {/* Progress */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{section.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-white">{section.name}</h2>
              <p className="text-white/80 text-sm">Question {currentQuestion + 1} of {section.questions.length}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white text-sm">Overall Progress</p>
            <p className="text-white font-semibold">{currentQuestionIndex}/{totalQuestions}</p>
          </div>
        </div>
        
        <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Section Progress Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {section.questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentQuestion ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className={`bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-2xl w-full transform transition-all duration-500 hover:scale-105`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 leading-tight">
            {question.q}
          </h2>
          {question.multi && (
            <p className="text-indigo-600 font-medium">
              Select all that apply ({currentSelections.length} selected)
            </p>
          )}
        </div>

        {/* Options */}
        <div className={`grid gap-4 mb-8 ${question.multi ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {question.options.map((opt, i) => {
            const isSelected = currentSelections.includes(i);
            return (
              <button
                key={i}
                onClick={() => handleSelect(i, question.multi)}
                className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? `bg-gradient-to-r ${section.color} text-white border-transparent shadow-lg`
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-indigo-300'
                } ${question.multi ? 'cursor-pointer' : ''}`}
              >
                {question.multi && (
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    isSelected ? 'bg-white border-white' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${section.color}`} />
                      </div>
                    )}
                  </div>
                )}
                <span className={`text-left font-medium ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-indigo-600'}`}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-300 hover:scale-105"
          >
            <span>←</span>
            <span>{currentQuestionIndex === 1 ? "Back" : "Previous"}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentSelections.length === 0}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 transform ${
              currentSelections.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : `bg-gradient-to-r ${section.color} text-white hover:scale-105 shadow-lg`
            }`}
          >
            <span>{currentQuestionIndex === totalQuestions ? "Complete" : "Next"}</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Section Indicator */}
      <div className="mt-8 flex space-x-4">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              idx === currentSection
                ? `bg-white text-gray-800 shadow-lg`
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span>{sec.icon}</span>
            <span className="text-sm font-medium">{sec.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}