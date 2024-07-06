import { checkTokenExpiration, getTokenStorage } from "@/utils/tokenService";
import axios from "axios";

const LOCAL_HOST = process.env.NEXT_PUBLIC_LOCAL_HOST;
const PORT = process.env.NEXT_PUBLIC_DB_PORT;
const BASE_URL = `${LOCAL_HOST}:${PORT}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    checkTokenExpiration();
    const token = getTokenStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
