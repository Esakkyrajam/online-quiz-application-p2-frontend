// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const QuizPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [quiz, setQuiz] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [scoreDialog, setScoreDialog] = useState(null); // score state

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       if (!id) {
//         setError("Invalid quiz ID.");
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/participant/quizzes/${id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const quizData = {
//           id: response.data._id || response.data.id,
//           title: response.data.title,
//           description: response.data.description,
//           questions: response.data.questions || [],
//           timeLimitSeconds: response.data.timeLimitSeconds || 0,
//         };

//         setQuiz(quizData);
//         setTimeLeft(quizData.timeLimitSeconds);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to load quiz:", err.response || err);
//         setError(
//           err.response?.data?.message ||
//             "Failed to load quiz. Please try again."
//         );
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id, token]);

//   // Timer countdown
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // Auto-submit when time is up
//   useEffect(() => {
//     if (timeLeft === 0 && quiz) {
//       handleSubmit();
//     }
//   }, [timeLeft]);

//   const handleOptionChange = (questionIdx, optionIdx) => {
//     setAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
//   };

//   const handleSubmit = async () => {
//     if (!quiz || !quiz.questions.length) return;
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/participant/quizzes/${id}/submit`,
//         { answers },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Show score in a dialog
//       setScoreDialog(`Your score: ${response.data.score}`);
//     } catch (err) {
//       console.error("Failed to submit quiz:", err.response || err);
//       setScoreDialog(
//         err.response?.data?.message || "Failed to submit quiz. Try again."
//       );
//     }
//   };

//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   if (loading)
//     return <p className="text-center mt-10 text-indigo-700">Loading quiz...</p>;
//   if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-indigo-900">{quiz.title}</h1>
//         <p className="text-xl font-semibold text-red-600">
//           Time Left: {formatTime(timeLeft)}
//         </p>
//       </div>
//       <p className="mt-2 text-indigo-700">{quiz.description}</p>

//       {/* Questions */}
//       {quiz.questions.length > 0 ? (
//         quiz.questions.map((q, idx) => (
//           <div key={idx} className="mt-4 p-4 border rounded">
//             <p className="font-semibold">{q.text}</p>
//             {q.options.map((opt, i) => (
//               <label key={i} className="block mt-1">
//                 <input
//                   type="radio"
//                   name={`q${idx}`}
//                   value={i}
//                   checked={answers[idx] === i}
//                   onChange={() => handleOptionChange(idx, i)}
//                   className="mr-2"
//                 />
//                 {opt}
//               </label>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p className="mt-4 text-indigo-700">
//           No questions available for this quiz.
//         </p>
//       )}

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         className="mt-6 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
//       >
//         Submit Quiz
//       </button>

//       {/* Score Dialog */}
//       {scoreDialog && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
//             <p className="text-lg font-semibold text-indigo-900 mb-4">
//               {scoreDialog}
//             </p>
//             <button
//               onClick={() => {
//                 setScoreDialog(null);
//                 navigate("/"); // go back to dashboard
//               }}
//               className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [scoreDialog, setScoreDialog] = useState(null); // score state

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) {
        setError("Invalid quiz ID.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/api/participant/quizzes/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const quizData = {
          id: response.data._id || response.data.id,
          title: response.data.title,
          description: response.data.description,
          questions: response.data.questions || [],
          timeLimitSeconds: response.data.timeLimitSeconds || 0,
        };

        setQuiz(quizData);
        setTimeLeft(quizData.timeLimitSeconds);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load quiz:", err.response || err);
        setError(
          err.response?.data?.message ||
            "Failed to load quiz. Please try again."
        );
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id, token]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Auto-submit when time is up
  useEffect(() => {
    if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleOptionChange = (questionIdx, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleSubmit = async () => {
    if (!quiz || !quiz.questions.length) return;
    try {
      const response = await axios.post(
        `http://localhost:8080/api/participant/quizzes/${id}/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Show score in a dialog
      setScoreDialog(`Your score: ${response.data.score}`);
    } catch (err) {
      console.error("Failed to submit quiz:", err.response || err);
      setScoreDialog(
        err.response?.data?.message || "Failed to submit quiz. Try again."
      );
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-indigo-600 font-semibold animate-pulse text-xl">
        Loading quiz...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-600 font-semibold text-xl">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-purple-200">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-purple-200 pb-4 mb-6">
          <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">
            {quiz.title}
          </h1>
          <div className="text-2xl font-mono font-semibold text-red-500 drop-shadow-md select-none">
            ⏰ {formatTime(timeLeft)}
          </div>
        </div>
        <p className="text-indigo-700 text-lg mb-8">{quiz.description}</p>

        {/* Questions */}
        {quiz.questions.length > 0 ? (
          quiz.questions.map((q, idx) => (
            <div
              key={idx}
              className="mb-6 p-6 border rounded-2xl border-purple-300 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className="font-semibold text-lg mb-3 text-indigo-800">
                {q.text}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className="cursor-pointer bg-purple-50 rounded-lg p-3 flex items-center gap-4 border border-transparent hover:border-indigo-500 transition-colors"
                  >
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={i}
                      checked={answers[idx] === i}
                      onChange={() => handleOptionChange(idx, i)}
                      className="form-radio text-indigo-600 w-5 h-5"
                    />
                    <span className="text-indigo-700 font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-indigo-700 text-center font-medium">
            No questions available for this quiz.
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-3xl font-semibold text-lg shadow-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-4 focus:ring-indigo-400"
        >
          Submit Quiz
        </button>

        {/* Score Dialog */}
        {scoreDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-sm p-8 text-center border border-indigo-300">
              <p className="text-2xl font-bold text-indigo-900 mb-6">
                {scoreDialog}
              </p>
              <button
                onClick={() => {
                  setScoreDialog(null);
                  navigate("/"); // go back to dashboard
                }}
                className="bg-indigo-600 text-white py-2 px-6 rounded-full text-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-4 focus:ring-indigo-400"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
