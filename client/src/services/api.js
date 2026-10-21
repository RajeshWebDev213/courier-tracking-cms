import axios from "axios";

// Connect backend
const api = axios.create({
  baseURL: "https://courier-tracking-cms.onrender.com/",
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;