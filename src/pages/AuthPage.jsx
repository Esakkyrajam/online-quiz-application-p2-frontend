import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  forgotPassword,
} from "../services/authService";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        if (
          response.status === 200 &&
          response.data?.token &&
          response.data?.roles
        ) {
          const user = { ...response.data, isAuthenticated: true };
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user));

          console.log("Logged in user roles:", user.roles); // Debug log

          if (user.roles.includes("ROLE_ADMIN")) {
            navigate("/admin");
          } else if (user.roles.includes("ROLE_PARTICIPANT")) {
            navigate("/");
          } else {
            setError("Unknown user role");
          }
        } else {
          setError(
            response.message || "Login failed: Invalid response from server"
          );
        }
      } else {
        const response = await registerUser({
          username: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200 || response.status === 201) {
          alert("Registration successful! Please log in.");
          setIsLogin(true);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          setError(response.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error("Login/Register error:", err); // Log for debugging
      setError(err.message || "Request failed. Please try again.");
    }
  };

  const handleForgotPasswordClick = async () => {
    if (!forgotEmail) {
      setError("Please enter an email address");
      return;
    }
    setError(null);
    try {
      const response = await forgotPassword(forgotEmail);
      if (response.status === 200) {
        alert("Password reset link sent! Check your email.");
        setShowForgotPassword(false);
        setForgotEmail("");
      } else {
        setError(response.message || "Failed to send reset email");
      }
    } catch (err) {
      console.error("Forgot password error:", err); // Log for debugging
      setError(err.message || "Error sending reset email");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Master</h1>
        <p className="text-xl text-gray-500 mb-2">
          Test your knowledge, challenge friends, and climb the leaderboard!
        </p>
        <p className="text-md text-gray-400">
          A fun and engaging platform to learn, compete, and grow. Sign up today
          and start quizzing!
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-10">
        {/* Toggle Login/Register */}
        <div className="flex mb-6 border-indigo-300 rounded-lg overflow-hidden">
          <button
            onClick={() => {
              setIsLogin(true);
              setError(null);
              setShowForgotPassword(false);
            }}
            className={`px-6 py-2 w-1/2 font-semibold transition-colors ${
              isLogin ? "bg-indigo-800 text-white" : "bg-white text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError(null);
              setShowForgotPassword(false);
            }}
            className={`px-6 py-2 w-1/2 font-semibold transition-colors ${
              !isLogin ? "bg-indigo-800 text-white" : "bg-white text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border-indigo-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-indigo-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border-indigo-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border-indigo-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          )}

          {isLogin && (
            <p className="text-right text-sm">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-indigo-600 hover:underline"
              >
                Forgot Password?
              </button>
            </p>
          )}

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-800 text-white py-3 rounded font-semibold hover:bg-indigo-400 transition-colors"
            disabled={
              !formData.email ||
              !formData.password ||
              (!isLogin && !formData.fullName)
            } // Disable button if required fields are empty
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              Reset Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full border-indigo-400 rounded p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPasswordClick}
                className="px-4 py-2 rounded bg-indigo-700 text-white hover:bg-indigo-800"
                disabled={!forgotEmail} // Disable button if email is empty
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
