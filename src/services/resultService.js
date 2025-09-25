import apiClient from "./apiClient"; // your axios instance

export const getResults = async (userId) => {
  try {
    const { data } = await apiClient.get(`/results`, {
      params: { userId }, // if your backend uses query param
    });
    console.log("Fetched results:", data);
    return data;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};
