import React from "react";
import { FaClipboardList, FaUsers, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-900 tracking-tight mb-3 select-none">
          Admin Dashboard
        </h1>
        <p className="text-indigo-700 text-lg font-medium max-w-xl mx-auto">
          Manage quizzes, users, and system settings with ease.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Quiz Management Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition hover:shadow-2xl hover:scale-[1.05] duration-300 cursor-pointer select-none">
          <FaClipboardList className="text-indigo-500 text-6xl mb-6" />
          <h2 className="text-2xl font-semibold text-indigo-900 mb-3">
            Quiz Management
          </h2>
          <p className="text-indigo-600 mb-8 max-w-xs">
            Create, update, and delete quizzes with a powerful and intuitive
            interface.
          </p>
          <button
            onClick={() => navigate("/admin/quizzes")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
          >
            Manage Quizzes
          </button>
        </div>

        {/* User Management Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition hover:shadow-2xl hover:scale-[1.05] duration-300 cursor-pointer select-none">
          <FaUsers className="text-green-500 text-6xl mb-6" />
          <h2 className="text-2xl font-semibold text-green-900 mb-3">
            User Management
          </h2>
          <p className="text-green-600 mb-8 max-w-xs">
            View and manage user accounts and roles effortlessly with detailed
            insights.
          </p>
          <button
            onClick={() => navigate("/admin/users")}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition"
          >
            Manage Users
          </button>
        </div>

        {/* Reports Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition hover:shadow-2xl hover:scale-[1.05] duration-300 cursor-pointer select-none">
          <FaChartBar className="text-purple-500 text-6xl mb-6" />
          <h2 className="text-2xl font-semibold text-purple-900 mb-3">
            Reports & Analytics
          </h2>
          <p className="text-purple-600 mb-8 max-w-xs">
            Analyze quiz results and user activity with beautiful
            visualizations.
          </p>
          <button
            onClick={() => navigate("/admin/reports")}
            className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 hover:shadow-lg transition"
          >
            View Reports
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
