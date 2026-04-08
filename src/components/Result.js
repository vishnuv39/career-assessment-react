import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useContext } from "react";
import confetti from "canvas-confetti";
import { AuthContext } from "../context/AuthContext";
import { API } from "../api";

const careerResources = {

  "Frontend Engineer": {
    roadmap: "https://roadmap.sh/frontend",
    courses: [
      "https://www.udemy.com/course/the-web-developer-bootcamp/",
      "https://www.coursera.org/learn/html-css-javascript-for-web-developers"
    ],
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"]
  },

  "Backend Engineer": {
    roadmap: "https://roadmap.sh/backend",
    courses: [
      "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
      "https://www.coursera.org/specializations/back-end-developer"
    ],
    skills: ["Node.js", "Databases", "APIs", "System Design", "Authentication"]
  },

  "Full Stack Engineer": {
    roadmap: "https://roadmap.sh/full-stack",
    courses: [
      "https://www.udemy.com/course/the-web-developer-bootcamp/",
      "https://www.coursera.org/specializations/full-stack-mobile-app-development"
    ],
    skills: ["Frontend", "Backend", "Databases", "Deployment", "DevOps Basics"]
  },

  "Data Scientist": {
    roadmap: "https://roadmap.sh/ai-data-scientist",
    courses: [
      "https://www.coursera.org/specializations/jhu-data-science",
      "https://www.udemy.com/course/machine-learning-a-z/"
    ],
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "Pandas"]
  },

  "Data Analyst": {
    roadmap: "https://roadmap.sh/data-analyst",
    courses: [
      "https://www.coursera.org/specializations/google-data-analytics",
      "https://www.udemy.com/course/data-analysis-with-pandas/"
    ],
    skills: ["Excel", "SQL", "Python", "Tableau", "Power BI"]
  },

  "ML Engineer": {
    roadmap: "https://roadmap.sh/ai-data-scientist",
    courses: [
      "https://www.coursera.org/specializations/machine-learning-introduction",
      "https://www.udemy.com/course/deep-learning/"
    ],
    skills: ["Python", "TensorFlow", "Deep Learning", "Model Deployment", "Scikit-learn"]
  },

  "AI Engineer": {
    roadmap: "https://roadmap.sh/ai-data-scientist",
    courses: [
      "https://www.coursera.org/specializations/ai-for-everyone",
      "https://www.udemy.com/course/artificial-intelligence/"
    ],
    skills: ["AI Systems", "Neural Networks", "Deep Learning", "NLP", "Computer Vision"]
  },

  "UI/UX Designer": {
    roadmap: "https://roadmap.sh/ux-design",
    courses: [
      "https://www.coursera.org/specializations/google-ux-design",
      "https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/"
    ],
    skills: ["Figma", "Wireframing", "Prototyping", "User Research", "Usability Testing"]
  },

  "Graphic Designer": {
    roadmap: "https://www.thebalancecareers.com/graphic-designer-career-path-526041",
    courses: [
      "https://www.coursera.org/learn/graphic-design",
      "https://www.udemy.com/course/graphic-design-masterclass/"
    ],
    skills: ["Photoshop", "Illustrator", "Typography", "Branding", "Creativity"]
  },

  "Product Manager": {
    roadmap: "https://www.productschool.com/blog/product-management/product-manager-roadmap/",
    courses: [
      "https://www.coursera.org/specializations/product-management",
      "https://www.udemy.com/course/product-management/"
    ],
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Leadership"]
  },

  "Startup Founder": {
    roadmap: "https://www.startupgrind.com/blog/how-to-become-a-startup-founder/",
    courses: [
      "https://www.coursera.org/learn/startup-entrepreneurship",
      "https://www.udemy.com/course/startup-entrepreneurship/"
    ],
    skills: ["Entrepreneurship", "Leadership", "Fundraising", "Business Strategy", "Innovation"]
  },

  "Marketing Manager": {
    roadmap: "https://www.thebalancecareers.com/marketing-manager-career-path-2061498",
    courses: [
      "https://www.coursera.org/specializations/digital-marketing",
      "https://www.udemy.com/course/digital-marketing-masterclass/"
    ],
    skills: ["Digital Marketing", "SEO", "Branding", "Analytics", "Content Strategy"]
  },

  "Operations Manager": {
    roadmap: "https://www.thebalancecareers.com/operations-manager-career-path-2061497",
    courses: [
      "https://www.coursera.org/learn/operations-management",
      "https://www.edx.org/learn/operations-management"
    ],
    skills: ["Operations", "Process Management", "Supply Chain", "Leadership", "Optimization"]
  },

  "General Physician": {
    roadmap: "https://www.aamc.org/cim/",
    courses: [
      "https://www.edx.org/learn/medicine",
      "https://www.coursera.org/learn/medical-terminology"
    ],
    skills: ["Diagnosis", "Patient Care", "Medical Knowledge", "Communication", "Clinical Skills"]
  },

  "Medical Researcher": {
    roadmap: "https://www.aamc.org/cim/",
    courses: [
      "https://www.coursera.org/specializations/drug-development",
      "https://www.edx.org/learn/biomedical-research"
    ],
    skills: ["Research", "Lab Work", "Data Analysis", "Scientific Writing", "Critical Thinking"]
  },

  "Radiologist": {
    roadmap: "https://www.aamc.org/cim/",
    courses: [
      "https://www.coursera.org/learn/medical-imaging",
      "https://www.edx.org/learn/radiology"
    ],
    skills: ["Medical Imaging", "Diagnosis", "Attention to Detail", "Technology", "Anatomy"]
  }

};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const scores = location.state?.scores || {};

  const career =
    Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "Assessment Incomplete";

  const confidence =
    Object.values(scores).length > 0
      ? Math.min(95, 60 + Object.values(scores).reduce((a, b) => a + b, 0) % 30)
      : 0;
  const hasSaved = useRef(false);

  useEffect(() => {
    if (user && career !== "Assessment Incomplete" && !hasSaved.current ) {

      hasSaved.current = true;

      fetch(API.saveResult, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          career,
          confidence,
          scores: JSON.stringify(scores)
        })
      });
    }
  }, [user, career, confidence, scores]);

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

  const resources = careerResources[career] || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Result Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl mb-4 animate-pulse">
            🎯 Your Best Career
          </h2>

          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            {career}
          </h1>

          {/* ✅ Confidence */}
          {confidence > 0 && (
            <p className="text-lg opacity-95 mb-4">
              Confidence: {confidence}%
            </p>
          )}

          {/* ✅ Path validation message */}
          {Object.keys(scores).length === 0 && (
            <p className="text-yellow-200 mb-4">
              ⚠️ Please complete the full assessment
            </p>
          )}

          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-indigo-700 transition shadow-lg hover:scale-105 active:scale-95"
          >
            Go to Home
          </button>
        </div>

        {/* Personalized Recommendations */}
        {resources.roadmap && (
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🚀 Your Career Roadmap</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Key Skills to Develop</h4>
                <div className="flex flex-wrap gap-2">
                  {resources.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Recommended Courses</h4>
                <ul className="space-y-2">
                  {resources.courses?.slice(0, 2).map((course, idx) => (
                    <li key={idx}>
                      <a 
                        href={course} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 underline"
                      >
                        Course {idx + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href={resources.roadmap} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition inline-block"
              >
                View Full Roadmap
              </a>
            </div>
          </div>
        )}

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
    </div>
  );
}