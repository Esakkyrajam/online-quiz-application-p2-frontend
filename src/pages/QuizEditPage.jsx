// src/pages/QuizEditPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimitSeconds, setTimeLimitSeconds] = useState(60);
  const [questions, setQuestions] = useState([
    { text: "", options: ["", ""], correctIndex: 0 },
  ]);
  const [loading, setLoading] = useState(false);

  // Fetch quiz by ID on mount
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `https://quiz-app-t7t1.onrender.com/api/admin/quizzes/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const quiz = response.data;
        setTitle(quiz.title);
        setDescription(quiz.description || "");
        setTimeLimitSeconds(quiz.timeLimitSeconds || 60);
        setQuestions(
          quiz.questions.length
            ? quiz.questions
            : [{ text: "", options: ["", ""], correctIndex: 0 }]
        );
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };
    fetchQuiz();
  }, [id]);

  // Handlers for questions/options
  const handleQuestionChange = (qIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", ""], correctIndex: 0 },
    ]);
  };

  const removeQuestion = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(
      newQuestions.length
        ? newQuestions
        : [{ text: "", options: ["", ""], correctIndex: 0 }]
    );
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    if (
      newQuestions[qIndex].correctIndex >= newQuestions[qIndex].options.length
    ) {
      newQuestions[qIndex].correctIndex = 0;
    }
    setQuestions(newQuestions);
  };

  // Submit updated quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedQuiz = { title, description, timeLimitSeconds, questions };
      await axios.put(
        `https://quiz-app-t7t1.onrender.com/api/admin/quizzes/${id}`,
        updatedQuiz,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      alert("Quiz updated successfully!");
      navigate("/admin/manage-quizzes");
    } catch (err) {
      console.error("Error updating quiz:", err);
      alert("Failed to update quiz");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 md:p-12">
      <h1 className="text-3xl font-bold text-indigo-500 mb-6">Edit Quiz</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-6 bg-white shadow-lg rounded-lg p-6 md:p-10"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Time Limit */}
        <input
          type="number"
          placeholder="Time Limit (seconds)"
          value={timeLimitSeconds}
          onChange={(e) => setTimeLimitSeconds(Number(e.target.value))}
          className="w-1/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          min={10}
          required
        />

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={q.text}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "text", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blueviolet-400"
                required
              />
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-lg hover:bg-red-200"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Options */}
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blueviolet-400"
                  required
                />
                {q.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(qIndex, oIndex)}
                    className="text-red-500 font-bold px-2 py-1 hover:text-red-700 cursor-pointer"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => addOption(qIndex)}
              className="bg-white border text-indigo-500 px-3 py-1 rounded-lg hover:bg-indigo-700 hover:text-white cursor-pointer"
            >
              Add Option
            </button>

            {/* Correct Index */}
            <div>
              <label className="block font-medium mb-1">
                Correct Answer Index
              </label>
              <input
                type="number"
                value={q.correctIndex}
                min="0"
                max={q.options.length - 1}
                onChange={(e) =>
                  handleQuestionChange(
                    qIndex,
                    "correctIndex",
                    Number(e.target.value)
                  )
                }
                className="border rounded-lg px-3 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-white border text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white cursor-pointer"
        >
          Add Question
        </button>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blueviolet-600 border text-indigo-500 px-6 py-3 rounded-lg shadow hover:bg-indigo-700 hover:text-white disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizEditPage;
