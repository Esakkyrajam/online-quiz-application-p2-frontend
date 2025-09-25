// // src/pages/QuizCreatePage.jsx
// import { useState } from "react";
// import { createQuiz } from "../services/quizService";

// const QuizCreatePage = () => {
//   const [title, setTitle] = useState("");
//   const [questions, setQuestions] = useState([
//     { text: "", options: ["", ""], correct: 0 },
//   ]);
//   const [loading, setLoading] = useState(false);

//   const handleQuestionChange = (qIndex, field, value) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex][field] = value;
//     setQuestions(newQuestions);
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex].options[oIndex] = value;
//     setQuestions(newQuestions);
//   };

//   const addQuestion = () => {
//     setQuestions([...questions, { text: "", options: ["", ""], correct: 0 }]);
//   };

//   const removeQuestion = (qIndex) => {
//     const newQuestions = [...questions];
//     newQuestions.splice(qIndex, 1);
//     setQuestions(
//       newQuestions.length
//         ? newQuestions
//         : [{ text: "", options: ["", ""], correct: 0 }]
//     );
//   };

//   const addOption = (qIndex) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex].options.push("");
//     setQuestions(newQuestions);
//   };

//   const removeOption = (qIndex, oIndex) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex].options.splice(oIndex, 1);
//     // Reset correct if out of bounds
//     if (newQuestions[qIndex].correct >= newQuestions[qIndex].options.length) {
//       newQuestions[qIndex].correct = 0;
//     }
//     setQuestions(newQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const quizData = { title, questions };
//       await createQuiz(quizData);
//       alert("Quiz created successfully!");
//       setTitle("");
//       setQuestions([{ text: "", options: ["", ""], correct: 0 }]);
//     } catch (err) {
//       console.error(err);
//       alert("Error creating quiz");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-white  flex flex-col items-center justify-start p-6 md:p-12">
//       {/* Header */}
//       <h1 className="text-2xl md:text-3xl font-bold text-indigo-500 mb-6">
//         Create a New Quiz
//       </h1>

//       {/* Form Container */}
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-4xl space-y-6 bg-white shadow-lg rounded-lg p-6 md:p-10"
//       >
//         {/* Quiz Title */}
//         <input
//           type="text"
//           placeholder="Quiz Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           required
//         />

//         {/* Questions */}
//         {questions.map((q, qIndex) => (
//           <div
//             key={qIndex}
//             className="border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm"
//           >
//             <div className="flex justify-between items-center">
//               <input
//                 type="text"
//                 placeholder={`Question ${qIndex + 1}`}
//                 value={q.text}
//                 onChange={(e) =>
//                   handleQuestionChange(qIndex, "text", e.target.value)
//                 }
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blueviolet-400"
//                 required
//               />
//               {questions.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeQuestion(qIndex)}
//                   className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-lg hover:bg-red-200"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>

//             {/* Options */}
//             {q.options.map((opt, oIndex) => (
//               <div key={oIndex} className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   placeholder={`Option ${oIndex + 1}`}
//                   value={opt}
//                   onChange={(e) =>
//                     handleOptionChange(qIndex, oIndex, e.target.value)
//                   }
//                   className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blueviolet-400"
//                   required
//                 />
//                 {q.options.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeOption(qIndex, oIndex)}
//                     className="text-red-500 font-bold px-2 py-1 hover:text-red-700 cursor-pointer"
//                   >
//                     ❌
//                   </button>
//                 )}
//               </div>
//             ))}

//             {/* Add Option Button */}
//             <button
//               type="button"
//               onClick={() => addOption(qIndex)}
//               className="bg-white border text-indigo-500 px-3 py-1 rounded-lg hover:bg-indigo-700 hover:text-white cursor-pointer"
//             >
//               Add Option
//             </button>

//             {/* Correct Answer Index */}
//             <div>
//               <label className="block font-medium mb-1">
//                 Correct Answer Index
//               </label>
//               <input
//                 type="number"
//                 value={q.correct}
//                 min="0"
//                 max={q.options.length - 1}
//                 onChange={(e) =>
//                   handleQuestionChange(
//                     qIndex,
//                     "correct",
//                     Number(e.target.value)
//                   )
//                 }
//                 className="border rounded-lg px-3 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
//               />
//             </div>
//           </div>
//         ))}

//         {/* Add Question Button */}
//         <button
//           type="button"
//           onClick={addQuestion}
//           className="bg-white border text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white cursor-pointer"
//         >
//           Add Question
//         </button>

//         {/* Save Quiz Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blueviolet-600 border text-indigo-500 px-6 py-3 rounded-lg shadow hover:bg-indigo-700 hover:text-white disabled:opacity-50 cursor-pointer"
//           >
//             {loading ? "Saving..." : "Save Quiz"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default QuizCreatePage;

// src/pages/QuizCreatePage.jsx
import { useState } from "react";
import { createQuiz } from "../services/quizService";

const QuizCreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimitSeconds, setTimeLimitSeconds] = useState(60); // default 1 min
  const [questions, setQuestions] = useState([
    { text: "", options: ["", ""], correctIndex: 0 },
  ]);
  const [loading, setLoading] = useState(false);

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
    // Reset correctIndex if out of bounds
    if (
      newQuestions[qIndex].correctIndex >= newQuestions[qIndex].options.length
    ) {
      newQuestions[qIndex].correctIndex = 0;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const quizData = { title, description, timeLimitSeconds, questions };
      await createQuiz(quizData);
      alert("Quiz created successfully!");
      // reset form
      setTitle("");
      setDescription("");
      setTimeLimitSeconds(60);
      setQuestions([{ text: "", options: ["", ""], correctIndex: 0 }]);
    } catch (err) {
      console.error(err);
      alert("Error creating quiz");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-6 md:p-12">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-indigo-500 mb-6">
        Create a New Quiz
      </h1>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-6 bg-white shadow-lg rounded-lg p-6 md:p-10"
      >
        {/* Quiz Title */}
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Quiz Description */}
        <textarea
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        {/* Time Limit */}
        <div>
          <label className="block font-medium mb-1">Time Limit (seconds)</label>
          <input
            type="number"
            min="10"
            value={timeLimitSeconds}
            onChange={(e) => setTimeLimitSeconds(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

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
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

            {/* Add Option Button */}
            <button
              type="button"
              onClick={() => addOption(qIndex)}
              className="bg-white border text-indigo-500 px-3 py-1 rounded-lg hover:bg-indigo-700 hover:text-white cursor-pointer"
            >
              Add Option
            </button>

            {/* Correct Answer Index */}
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

        {/* Add Question Button */}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-white border text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white cursor-pointer"
        >
          Add Question
        </button>

        {/* Save Quiz Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving..." : "Save Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizCreatePage;
