import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 text-center">
        Welcome to TechQuiz!
      </h1>
      <p className="text-indigo-600 text-lg mb-8 text-center max-w-xl">
        Take quizzes, track your results, and improve your skills. Join the
        challenge and test your knowledge!
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/participant")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Browse Quizzes
        </button>
        <button
          onClick={() => navigate("/reports")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          My Results
        </button>
      </div>
    </div>
  );
};

export default HomePage;
