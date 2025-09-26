import axios from "axios";

const BASE_URL = "https://quiz-app-t7t1.onrender.com/api/auth";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const withRetry = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1 || error?.response?.status >= 400) {
        throw error;
      }
      console.warn(`Retry ${i + 1}/${retries} for request: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

export const registerUser = async (userData) => {
  if (!userData.username || !userData.email || !userData.password) {
    return {
      status: 400,
      message: "Username, email, and password are required",
    };
  }

  try {
    const response = await withRetry(() =>
      axiosInstance.post("/register", userData)
    );
    return {
      status: response.status,
      data: response.data,
      message: "Registration successful",
    };
  } catch (error) {
    console.error("Register user error:", error);
    return {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Registration failed",
    };
  }
};

export const forgotPassword = async (email) => {
  if (!email) {
    return {
      status: 400,
      message: "Email is required",
    };
  }

  try {
    const response = await withRetry(() =>
      axiosInstance.post("/forgot-password", { email })
    );
    return {
      status: response.status,
      data: response.data,
      message: "Password reset email sent",
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Failed to send reset email",
    };
  }
};

export const loginUser = async (credentials) => {
  if (!credentials.email || !credentials.password) {
    return {
      status: 400,
      message: "Email and password are required",
    };
  }

  try {
    const response = await withRetry(() =>
      axiosInstance.post("/login", credentials)
    );
    return {
      status: response.status,
      data: {
        token: response.data.token || response.data.accessToken, // Handle both token and accessToken
        username: response.data.username || credentials.email,
        roles: response.data.roles || response.data.authorities || [],
        type: response.data.type || "Bearer",
      },
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login user error:", error);
    return {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message || error.message || "Login failed",
    };
  }
};
