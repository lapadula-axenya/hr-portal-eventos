"use client";

import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { usePagination } from "@/hooks/usePagination";
import { PrincipalFilter } from "@/services/principalService";
import { GetAllParamsDefault } from "@/types/apiResponse";

type PrincipalParamsContextType = {
  changePage: (_: unknown, newPage: number) => void;
  setSearch: Dispatch<SetStateAction<string>>;
  page: number;
  search: string;
  principalParams: GetAllParamsDefault<PrincipalFilter>;
  modalPrincipalId: string;
  setModalPrincipalId: Dispatch<SetStateAction<string>>;
};

const PrincipalParamsContext = createContext<
  PrincipalParamsContextType | undefined
>(undefined);

export function usePrincipalParamsContext() {
  const context = useContext(PrincipalParamsContext);
  if (!context) {
    throw new Error(
      "usePrincipalParamsContext must be used within a PrincipalParamsProvider",
    );
  }
  return context;
}

export function PrincipalParamsProvider({ children }: PropsWithChildren) {
  const { changePage, page } = usePagination();

  const [modalPrincipalId, setModalPrincipalId] = useState<string>("");

  const [search, setSearch] = useState("");

  const principalParams: GetAllParamsDefault<PrincipalFilter> = useMemo(
    () => ({
      page,
      ...(search && { searchTerm: search }),
    }),
    [page, search],
  );

  const value: PrincipalParamsContextType = {
    changePage,
    setSearch,
    page,
    search,
    principalParams,
    modalPrincipalId,
    setModalPrincipalId,
  };

  return (
    <PrincipalParamsContext.Provider value={value}>
      {children}
    </PrincipalParamsContext.Provider>
  );
}
