import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ParticipantDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch quizzes from backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token from login
        if (!token) {
          setError("You must be logged in to view quizzes.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/participant/quizzes", // removed trailing slash
          {
            headers: {
              Authorization: `Bearer ${token}`, // send JWT
            },
          }
        );

        // Map _id from MongoDB to id
        const quizzesData = response.data.map((quiz) => ({
          id: quiz._id || quiz.id,
          title: quiz.title,
          description: quiz.description,
        }));

        setQuizzes(quizzesData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err.response || err);
        setError(
          err.response?.data?.message ||
            "Failed to load quizzes. Please try again."
        );
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Navigate to quiz page
  const handleTakeQuiz = (quizId) => {
    console.log("Navigating to quiz ID:", quizId); // debug
    navigate(`/quiz/${quizId}`);
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-indigo-700">Loading quizzes...</p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-800">
          Participant Dashboard
        </h1>
        <p className="text-indigo-600 mt-2">
          Browse available quizzes and track your progress.
        </p>
      </header>

      <main className="space-y-6 max-w-4xl mx-auto">
        {quizzes.length === 0 ? (
          <p className="text-center text-indigo-700">
            No quizzes available at the moment.
          </p>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition flex items-center justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold text-indigo-900">
                  {quiz.title}
                </h2>
                <p className="text-indigo-700 mt-1">{quiz.description}</p>
              </div>
              <button
                onClick={() => handleTakeQuiz(quiz.id)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Take Quiz
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default ParticipantDashboard;
