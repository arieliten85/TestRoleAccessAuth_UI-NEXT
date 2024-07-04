import { jwtDecode } from "jwt-decode";

export const getTokenStorage = () => {
  return localStorage.getItem("token");
};

export const getUserStorage = () => {
  return localStorage.getItem("user");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeTokenStorage = () => {
  localStorage.removeItem("token");
};
export const removeUserStorage = () => {
  localStorage.removeItem("user");
};
