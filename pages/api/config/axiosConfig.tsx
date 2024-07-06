import { checkTokenExpiration, getTokenStorage } from "@/utils/tokenService";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_DEV;

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
