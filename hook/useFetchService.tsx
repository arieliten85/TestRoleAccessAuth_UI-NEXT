import { useState } from "react";
import axiosInstance from "../pages/api/config/axiosConfig";
import axios, { AxiosError } from "axios";

interface FetchResponse {
  data: any;
  message: string;
  status: boolean;
}

interface FetchService {
  data: FetchResponse | null;
  error: string | null;
  setError: (error: string | null) => void;
  fetchGet: () => Promise<void>;
  fetchPost: () => Promise<void>;
  fetchPut: () => Promise<void>;
  fetchDelete: () => Promise<void>;
}

export const useFetchService = (): FetchService => {
  const [data, setData] = useState<FetchResponse | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchGet = async () => {
    try {
      const response = await axiosInstance.get("/method/get");

      setData(response.data);
      setError(null);
    } catch (err) {
      handleFetchError(err);
    } finally {
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.post("/method/post");
      setData(response.data);
      setError(null);
    } catch (err) {
      handleFetchError(err);
    } finally {
    }
  };
  const fetchPut = async () => {
    try {
      const response = await axiosInstance.put("/method/put");
      setData(response.data);
      setError(null);
    } catch (err) {
      handleFetchError(err);
    } finally {
    }
  };

  const fetchDelete = async () => {
    try {
      const response = await axiosInstance.delete("/method/delete");
      setData(response.data);
      setError(null);
    } catch (err) {
      handleFetchError(err);
    } finally {
    }
  };

  const handleFetchError = (err: any) => {
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response?.status === 401) {
        setError(
          "Access Denied: You do not have permission to access this route."
        );
      } else {
        setError("An error occurred while fetching data.");
      }
    } else {
      setError("Network error occurred.");
    }
    setData(null);
  };

  return {
    data,
    error,
    setError,
    fetchGet,
    fetchPost,
    fetchPut,
    fetchDelete,
  };
};
