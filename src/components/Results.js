import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { API } from "../api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

export default function Results() {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(API.getResults(user.email))
        .then(res => res.json())
        .then(data => {
          // Sort by date descending (newest first)
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setResults(data);
        });
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view your results.</div>;
  }

  // Prepare data for chart
  const chartData = results
    .slice()
    .reverse() // Reverse to show chronological order
    .map((result, index) => ({
      date: new Date(result.date).toLocaleDateString(),
      confidence: result.confidence,
      career: result.career
    }));

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Analytics Section */}
        {results.length > 1 && (
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 Your Career Assessment Analytics</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Confidence Trend Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, 'Confidence']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-600">Total Assessments</h4>
                <p className="text-2xl font-bold text-indigo-800">{results.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-600">Average Confidence</h4>
                <p className="text-2xl font-bold text-green-800">
                  {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.confidence, 0) / results.length) : 0}%
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-600">Latest Career</h4>
                <p className="text-lg font-bold text-purple-800">{results[0]?.career || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results History */}
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Assessment Results</h1>

          {results.length === 0 ? (
            <p className="text-center text-gray-600">No assessment results found. Take an assessment to see your results here!</p>
          ) : (
            <div className="space-y-6">
              {results.map((result, index) => {
                const resources = careerResources[result.career] || {};
                const isExpanded = expandedIndex === index;
                
                return (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md">
                    <div 
                      className="cursor-pointer" 
                      onClick={() => toggleExpand(index)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                            {result.career}
                          </h2>
                          <p className="text-gray-600">
                            Confidence: {result.confidence}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(result.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          <button className="text-indigo-600 hover:text-indigo-800 mt-2">
                            {isExpanded ? 'Hide Details' : 'View Details'}
                          </button>
                        </div>
                      </div>

                      
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && resources.roadmap && (
                      <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 Career Roadmap & Resources</h3>
                        
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}