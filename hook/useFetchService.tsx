import { useState } from "react";
import axiosInstance from "../pages/api/config/axiosConfig";
import axios, { AxiosError } from "axios";

interface DataFetch {
  data: "";
}

interface FetchService {
  data: DataFetch | null;
  error: string | null;
  loading: boolean;
  setError: (error: string | null) => void;
  fetchGet: () => Promise<void>;
  fetchPost: () => Promise<void>;
  fetchPut: () => Promise<void>;
  fetchDelete: () => Promise<void>;
}

export const useFetchService = (): FetchService => {
  const [loading, seloading] = useState<boolean>(false);
  const [data, setData] = useState<DataFetch | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchGet = async () => {
    try {
      seloading(true);
      const response = await axiosInstance.get("/method/get");
      setTimeout(() => {
        setData(response.data);
        seloading(false);
        setError(null);
      }, 150);
    } catch (err) {
      setTimeout(() => {
        handleFetchError(err);
        seloading(false);
      }, 150);
    } finally {
    }
  };

  const fetchPost = async () => {
    seloading(true);
    try {
      const response = await axiosInstance.post("/method/post");
      setTimeout(() => {
        setData(response.data);
        seloading(false);
        setError(null);
      }, 150);
    } catch (err) {
      setTimeout(() => {
        handleFetchError(err);
        seloading(false);
      }, 150);
    } finally {
    }
  };
  const fetchPut = async () => {
    seloading(true);
    try {
      const response = await axiosInstance.put("/method/put");
      setTimeout(() => {
        setData(response.data);
        seloading(false);
        setError(null);
      }, 200);
    } catch (err) {
      setTimeout(() => {
        handleFetchError(err);
        seloading(false);
      }, 150);
    } finally {
    }
  };

  const fetchDelete = async () => {
    seloading(true);
    try {
      const response = await axiosInstance.delete("/method/delete");
      setTimeout(() => {
        setData(response.data);
        seloading(false);
        setError(null);
      }, 150);
    } catch (err) {
      setTimeout(() => {
        handleFetchError(err);
        seloading(false);
      }, 150);
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
    loading,
    setError,
    fetchGet,
    fetchPost,
    fetchPut,
    fetchDelete,
  };
};
