import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchStartCardOverview = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await apiClient.get("/api/v1/admin/overview", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    if (!data) {
      throw new Error("Invalid overview data format or empty metrics");
    }

    return data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out after 10 seconds");
    }

    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please log in again.");
      }
      throw new Error(
        `Error fetching overview metrics: ${error.response.status} - ${error.response.statusText}`
      );
    }

    console.error("Error fetching overview metrics:", {
      message: error.message,
      stack: error.stack,
    });

    throw error;
  }
};

export default fetchStartCardOverview;
