import axios from "axios";


const API_BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://mit-capstone-bank-app.onrender.com/api/v1";


let accessToken: string | null =  null;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 🔹 Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Interceptor para refresh automático
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await apiClient.post("auth/refresh");
        console.log("New access token:", res);
        const newAccess = res.data.accessToken;
        localStorage.setItem("access-token", newAccess);

        // reintenta con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error("Refresh failed, redirect to login", err);
      }
    }

    return Promise.reject(error);
  }
);
export default apiClient;
