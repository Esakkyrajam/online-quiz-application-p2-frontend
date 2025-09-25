// src/pages/QuizListPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes } from "../services/quizService";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data.reverse()); // recent quizzes on top
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
      setLoading(false);
    };
    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/take/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-12 px-4">
      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
        Available Quizzes
      </h1>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading quizzes...</p>}

      {/* Empty State */}
      {!loading && quizzes.length === 0 && (
        <p className="text-gray-500">No quizzes available. Check back later!</p>
      )}

      {/* Quiz List */}
      <div className="w-md  space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => handleQuizClick(quiz.id)}
            className="bg-white border border-gray-200 rounded-lg shadow-md px-6 py-4 transition hover:shadow-lg hover:border-blueviolet-400 cursor-pointer"
          >
            <h2 className="text-lg font-medium text-indigo-600">
              {quiz.title}
            </h2>
            <p className="text-gray-600 mt-1">
              {quiz.questions?.length || 0} Questions
            </p>
          </div>
        ))}
      </div>

      {/* <div className="w-full space-y-5">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => handleQuizClick(quiz.id)}
            className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg px-7 py-5 transition-shadow duration-300 hover:shadow-2xl hover:border-[##8A2BE2] hover:bg-[rgba(138,43,226,0.04)] cursor-pointer"
          >
            <h2 className="text-xl font-semibold" style={{ color: "#8A2BE2" }}>
              {quiz.title}
            </h2>
            <p className="text-gray-500 mt-1 text-base">
              {quiz.questions?.length || 0} Questions
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default QuizListPage;
