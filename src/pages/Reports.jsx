import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Admin token missing! Please login again.");
        return;
      }

      const res = await axios.get(
        "https://quiz-app-t7t1.onrender.com/api/admin/results",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
      alert("Failed to fetch reports. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Summarize scores by quiz
  const aggregatedScores = results.reduce((acc, r) => {
    acc[r.quizTitle] = (acc[r.quizTitle] || 0) + r.score;
    return acc;
  }, {});

  const quizScores = Object.entries(aggregatedScores).map(
    ([quizTitle, score]) => ({
      quizTitle,
      score,
    })
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-5xl font-extrabold text-violet-800 mb-6">
          Quiz Dashboard
        </h1>

        {/* Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/50 shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Total Quizzes
            </h2>
            <div className="text-3xl text-indigo-700 font-bold">
              {new Set(results.map((r) => r.quizTitle)).size}
            </div>
          </div>
          <div className="bg-white/50 shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Participants
            </h2>
            <div className="text-3xl text-indigo-700 font-bold">
              {new Set(results.map((r) => r.username)).size}
            </div>
          </div>
          <div className="bg-white/50 shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Avg. Score
            </h2>
            <div className="text-3xl text-indigo-700 font-bold">
              {results.length
                ? (
                    results.reduce((s, r) => s + r.score, 0) / results.length
                  ).toFixed(1)
                : 0}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/80 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Scores by Quiz
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quizScores}>
              <XAxis dataKey="quizTitle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#6366F1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700">
                  {res.username[0]}
                </div>
                <span className="font-bold text-indigo-900">
                  {res.username}
                </span>
              </div>
              <div className="text-violet-700 text-lg mb-1">
                {res.quizTitle}
              </div>
              <div>
                <b>Score:</b> {res.score} / {res.totalQuestions}
              </div>
              <div className="text-xs text-gray-400">
                {res.attemptDate
                  ? new Date(res.attemptDate).toLocaleString()
                  : "-"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
