import axios, { AxiosInstance } from "axios";
import { getAuth } from "firebase/auth";
import { companyStore } from "@/lib/companyStore";
import { axiosHeaders } from "./axiosHeaders";

const configureInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const user = getAuth().currentUser;

      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }

      const companyId = companyStore.get();
      if (companyId) {
        config.headers["X-Company-Id"] = companyId;
      }

      return config;
    },
    (error) => {
      return Promise.reject(
        error instanceof Error ? error : new Error("Unknown error"),
      );
    },
  );
};

/**
 * * Axios client for frontend-to-backend requests (requires auth token).
 * * Used in the browser to call protected backend routes.
 */
export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: axiosHeaders,
});

configureInterceptor(clientApi);
