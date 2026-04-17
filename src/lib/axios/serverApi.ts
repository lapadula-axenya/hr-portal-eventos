import axios, { AxiosInstance } from "axios";
import { axiosHeaders } from "./axiosHeaders";
import { getSecret } from "../secretManager";

let cachedServerApi: AxiosInstance | null = null;

/**
 * * Axios client for backend-to-backend calls (using API Key).
 * * Used in Next.js backend (API routes) to call backend services.
 */
export async function createServerApi() {
  if (cachedServerApi) {
    return cachedServerApi;
  }

  const apiKey = await getSecret(
    process.env.SECRET_MANAGER_API_KEY!,
    process.env.API_KEY!,
  );

  cachedServerApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      ...axiosHeaders,
      "x-api-key": apiKey,
    },
  });

  return cachedServerApi;
}
