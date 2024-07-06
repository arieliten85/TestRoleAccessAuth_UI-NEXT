import { TokenDecodedResponse } from "@/context/userAuthContext";
import axiosInstance from "@/pages/api/config/axiosConfig";
import { jwtDecode } from "jwt-decode";

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const decodedToken: TokenDecodedResponse = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    localStorage.setItem("tokenExpiration", expirationTime.toString());
  } else {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Función para verificar el tiempo de expiración del token
export const checkTokenExpiration = () => {
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  if (tokenExpiration) {
    const expirationTime = parseInt(tokenExpiration, 10);
    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
      console.log("El token ha expirado");
      removeTokenStorage();
      removeTimeExpiredTokenStorage();
      removeUserStorage();
      window.location.replace("/session-expired");
    }
  }
};

export const startTokenExpirationCheck = () => {
  setInterval(checkTokenExpiration, 6000); // 60000 milisegundos = 1 minuto
};

//USER
export const getUserStorage = () => {
  return localStorage.getItem("user");
};

export const removeUserStorage = () => {
  localStorage.removeItem("user");
};

// TOKEN
export const getTokenStorage = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeTokenStorage = () => {
  localStorage.removeItem("token");
};

// EXPIRED TOKEN
export const getTimeExpiredTokenStorage = () => {
  return localStorage.getItem("tokenExpiration");
};

export const removeTimeExpiredTokenStorage = () => {
  localStorage.removeItem("tokenExpiration");
};
