"use client";

import { createContext, useContext } from "react";

type DashboardOnlyContextType = {
  isDashboardOnly: boolean;
};

export const DashboardOnlyContext = createContext<
  DashboardOnlyContextType | undefined
>(undefined);

export function useDashboardOnlyContext() {
  const context = useContext(DashboardOnlyContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardOnlyContext must be used within a DashboardOnlyContext.Provider",
    );
  }
  return context;
}
