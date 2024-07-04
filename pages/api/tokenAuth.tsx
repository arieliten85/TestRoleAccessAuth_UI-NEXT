import axiosInstance from "./config/axiosConfig";

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
