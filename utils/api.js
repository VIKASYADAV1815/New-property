import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://propery-search-backend.onrender.com/api",
  withCredentials: true,

});

// ✅ response interceptor (debug + clean error)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message;

    console.error("API ERROR:", message);
    return Promise.reject(error);
  }
);

export default api;
