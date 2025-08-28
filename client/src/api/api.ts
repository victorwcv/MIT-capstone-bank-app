import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api/v1";
const API_BASE_URL = "https://victor-ccanchifullstackbankingapplication.onrender.com10000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
