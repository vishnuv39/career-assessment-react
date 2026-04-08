import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Profile</h1>

        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 border-4 border-indigo-500 text-white text-6xl">
            👤
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Details */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Personal Details</h3>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-lg text-gray-900">{user.email}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Profession</label>
                <p className="text-lg text-gray-900">{user.profession}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <p className="text-lg text-gray-900">{user.mobile}</p>
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Academic Details</h3>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                <p className="text-lg text-gray-900">{user.qualification}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">University/College</label>
                <p className="text-lg text-gray-900">{user.university}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">GPA/Grade</label>
                <p className="text-lg text-gray-900">{user.gpa}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}