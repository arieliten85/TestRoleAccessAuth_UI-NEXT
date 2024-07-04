import axios from "axios";
const locahost = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: locahost,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
