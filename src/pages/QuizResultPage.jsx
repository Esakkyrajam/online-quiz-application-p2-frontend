import { useEffect, useState } from "react";
import { getResults } from "../services/resultService";

const QuizResultPage = ({ userId }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Loading state

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getResults(userId);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchResults();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-indigo-700 font-semibold text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-blueviolet mb-8 text-center">
        My Quiz Results
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blueviolet text-white text-lg font-semibold">
            <tr>
              <th className="py-4 px-6">Quiz</th>
              <th className="py-4 px-6">Score</th>
              <th className="py-4 px-6">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No results found.
                </td>
              </tr>
            ) : (
              results.map((r, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-b-0 hover:bg-blueviolet/10 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-blueviolet">
                    {r.quizTitle}
                  </td>
                  <td className="py-4 px-6">{r.score}</td>
                  <td className="py-4 px-6">
                    {new Date(r.attemptDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizResultPage;
