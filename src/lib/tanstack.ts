import { QueryClient } from "@tanstack/react-query";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const tanstackQueryConfig = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES_IN_MS,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
