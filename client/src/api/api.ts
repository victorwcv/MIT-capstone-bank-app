import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://mit-capstone-bank-app.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
