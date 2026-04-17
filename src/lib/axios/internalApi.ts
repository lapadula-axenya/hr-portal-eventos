import axios from "axios";
import { axiosHeaders } from "./axiosHeaders";

/**
 * * Axios client for frontend-to-Next.js internal API requests.
 * * Used in the browser to call internal Next.js API routes.
 */
export const internalApi = axios.create({
  headers: {
    ...axiosHeaders,
    "x-internal-client": process.env.NEXT_PUBLIC_CLIENT_SECRET!,
  },
});
