import { checkTokenExpiration, getTokenStorage } from "@/utils/tokenService";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface CustomAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_PROD;

console.log(BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// EN CADA CONSULTA CHEQUEA QUE TENGA EL TOKEN Y NO HAYA EXPIRADO
axiosInstance.interceptors.request.use(
  (config) => {
    checkTokenExpiration();
    const token = getTokenStorage();

    if (token && config.url && !config.url.startsWith(`${BASE_URL}/auth/`)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
