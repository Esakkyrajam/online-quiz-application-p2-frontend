import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://quiz-app-t7t1.onrender.com/api/participant/quizzes", // your Spring Boot backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally attach token if using JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
