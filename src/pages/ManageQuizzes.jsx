// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ManageQuizzes = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // TODO: Replace with API call to fetch quizzes
//     setQuizzes([
//       { id: "q1", title: "General Knowledge", questions: 10 },
//       { id: "q2", title: "Science Quiz", questions: 15 },
//     ]);
//   }, []);

//   return (
//     <div className="p-8 max-w-5xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6">Manage Quizzes</h1>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="border border-gray-300 px-4 py-2">Title</th>
//             <th className="border border-gray-300 px-4 py-2">Questions</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {quizzes.map((quiz) => (
//             <tr key={quiz.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2">{quiz.title}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {quiz.questions}
//               </td>
//               <td className="border border-gray-300 px-4 py-2 space-x-2">
//                 <button className="text-blue-600 hover:underline">Edit</button>
//                 <button className="text-red-600 hover:underline">Delete</button>
//               </td>
//             </tr>
//           ))}
//           {quizzes.length === 0 && (
//             <tr>
//               <td colSpan={3} className="text-center py-6">
//                 No quizzes found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <button
//         onClick={() => navigate("/admin/quiz-create")}
//         className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition"
//       >
//         Create New Quiz
//       </button>
//     </div>
//   );
// };

// export default ManageQuizzes;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/quizzes",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"), // if using JWT
            },
          }
        );

        // Map backend data to match frontend
        const quizData = response.data.map((q) => ({
          id: q.id,
          title: q.title,
          questions: q.questions ? q.questions.length : 0, // count of questions
        }));

        setQuizzes(quizData);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/quizzes/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setQuizzes(quizzes.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Manage Quizzes</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Questions</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{quiz.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {quiz.questions}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => navigate(`/admin/quiz-edit/${quiz.id}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(quiz.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {quizzes.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-6">
                No quizzes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={() => navigate("/admin/quiz-create")}
        className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition"
      >
        Create New Quiz
      </button>
    </div>
  );
};

export default ManageQuizzes;
