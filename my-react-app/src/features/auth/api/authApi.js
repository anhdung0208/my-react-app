import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const loginRequest = async (accountName, password, setErr) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
      accountName,
      password,
    });

    localStorage.setItem("token", response.data.accessToken);
  } catch (error) {
    if (error.response) {
      throw new Error("Invalid email or password. Please try again.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export default loginRequest;
