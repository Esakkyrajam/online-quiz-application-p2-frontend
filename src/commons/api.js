import axios from "axios";

const BASE_URL = "https://quiz-app-t7t1.onrender.com/api";

// Helper to get Authorization header with token (if available)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Combined headers for JSON content + auth token
const getHeaders = () => ({
  "Content-Type": "application/json",
  ...getAuthHeaders(),
});

// Generic GET request with auth header
export const getAPI = async (endpoint) => {
  try {
    const response = await axios.get(BASE_URL + endpoint, {
      headers: getHeaders(),
    });
    return {
      status: response.status,
      message: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("GET API ERROR:", error);
    return {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message || error.message || "Unexpected error",
      data: null,
    };
  }
};

// Generic POST request with auth header
export const postAPI = async (endpoint, payload) => {
  try {
    const response = await axios.post(BASE_URL + endpoint, payload, {
      headers: getHeaders(),
    });
    return {
      status: response.status,
      message: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("POST API ERROR:", error);
    return {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message || error.message || "Unexpected error",
      data: null,
    };
  }
};

// Generic PATCH request with auth header
export const patchAPI = async (endpoint, payload) => {
  try {
    const response = await axios.patch(BASE_URL + endpoint, payload, {
      headers: getHeaders(),
    });
    return {
      status: response.status,
      message: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("PATCH API ERROR:", error);
    return {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message || error.message || "Unexpected error",
      data: null,
    };
  }
};

// Generic DELETE request with auth header
export const deleteAPI = async (endpoint) => {
  try {
    const response = await axios.delete(BASE_URL + endpoint, {
      headers: getHeaders(),
    });
    return {
      status: response.status,
      message: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("DELETE API ERROR:", error);
    return {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message || error.message || "Unexpected error",
      data: null,
    };
  }
};
