import axios from "axios";

// Create axios instance with base URL
const apiurl = axios.create({
  baseURL: "backend-six-gamma-63.vercel.app",
});

// Automatically attach Bearer Token
apiurl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiurl;