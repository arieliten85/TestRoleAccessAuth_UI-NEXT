import axiosInstance from "./config/axiosConfig";

interface RegisterData {
  username: string;
  password: string;
  roleRequest: {
    roleListName: string[];
  };
}

interface LoginData {
  username: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axiosInstance.post("/auth/sign-up", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/log-in", data);
    return response.data;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
};
