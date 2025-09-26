import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminReports = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all results from backend
  const fetchResults = async () => {
    try {
      const res = await axios.get(
        "https://quiz-app-t7t1.onrender.com/api/admin/results",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Quiz Reports & Analytics
      </h1>

      {loading ? (
        <div className="text-center py-6">Loading reports...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-6">No results found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 px-4 py-2">
                  Participant
                </th>
                <th className="border border-gray-300 px-4 py-2">Quiz Title</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Questions
                </th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {result.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.quizTitle}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.score}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.totalQuestions}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(result.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
