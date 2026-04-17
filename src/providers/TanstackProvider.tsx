"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { tanstackQueryConfig } from "@/lib/tanstack";

export function TanstackQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={tanstackQueryConfig}>
      {children}
    </QueryClientProvider>
  );
}
