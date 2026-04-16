"use client";

import React, { createContext, useContext, PropsWithChildren } from "react";
import { CompanyWithMeta } from "@/services/companyService";

type CompanyContextType = {
  selectedCompanyId: string | null;
  companies: CompanyWithMeta[];
  setSelectedCompany: (id: string | null) => void;
  companyQueryKey: string[];
  isCompanyReady: boolean;
};

const CompanyContext = createContext<CompanyContextType>({
  selectedCompanyId: "acme-001",
  companies: [],
  setSelectedCompany: () => {},
  companyQueryKey: ["acme-001"],
  isCompanyReady: true,
});

export function useCompanyContext() {
  return useContext(CompanyContext);
}

export function CompanyProvider({ children }: PropsWithChildren) {
  return (
    <CompanyContext.Provider
      value={{
        selectedCompanyId: "acme-001",
        companies: [],
        setSelectedCompany: () => {},
        companyQueryKey: ["acme-001"],
        isCompanyReady: true,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
