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
import { Dayjs } from "dayjs";
import { usePagination } from "@/hooks/usePagination";
import { InvoiceFilter } from "@/services/invoiceService";
import { GetAllParamsDefault } from "@/types/apiResponse";
import { FilterOperator } from "@/types/filterOperator";

type InvoiceParamsContextType = {
  benefitTypesFilter: string[];
  companyIdsFilter: string[];
  providerIdsFilter: string[];
  changePage: (_: unknown, newPage: number) => void;
  clearFilter: () => void;
  hasFilter: boolean;
  invoiceParams: GetAllParamsDefault<InvoiceFilter>;
  page: number;
  search: string;
  startDate: Dayjs | null;
  setStartDate: Dispatch<SetStateAction<Dayjs | null>>;
  endDate: Dayjs | null;
  setEndDate: Dispatch<SetStateAction<Dayjs | null>>;
  setBenefitTypesFilter: Dispatch<SetStateAction<string[]>>;
  setProviderIdsFilter: Dispatch<SetStateAction<string[]>>;
  setCompanyIdsFilter: Dispatch<SetStateAction<string[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
};

const InvoiceParamsContext = createContext<
  InvoiceParamsContextType | undefined
>(undefined);

export function useInvoiceParamsContext() {
  const context = useContext(InvoiceParamsContext);
  if (!context) {
    throw new Error(
      "useInvoiceParamsContext must be used within a InvoiceParamsProvider",
    );
  }
  return context;
}

export function InvoiceParamsProvider({ children }: PropsWithChildren) {
  const { changePage, page } = usePagination();

  // TICKET PARAMS
  const [search, setSearch] = useState("");
  const [companyIdsFilter, setCompanyIdsFilter] = useState<string[]>([]);
  const [providerIdsFilter, setProviderIdsFilter] = useState<string[]>([]);
  const [benefitTypesFilter, setBenefitTypesFilter] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const hasFilter =
    !!companyIdsFilter.length ||
    !!providerIdsFilter.length ||
    !!benefitTypesFilter.length;

  const clearFilter = () => {
    setCompanyIdsFilter([]);
    setProviderIdsFilter([]);
    setBenefitTypesFilter([]);
  };

  const invoiceParams: GetAllParamsDefault<InvoiceFilter> = useMemo(
    () => ({
      page,
      ...(search && {
        "filter.file.name": `${FilterOperator.ILIKE}:${search}`,
      }),
      ...(!!companyIdsFilter.length && {
        "filter.company.id": `${FilterOperator.IN}:${companyIdsFilter.join(",")}`,
      }),
      ...(!!providerIdsFilter.length && {
        "filter.provider.id": `${FilterOperator.IN}:${providerIdsFilter.join(",")}`,
      }),
      ...(!!benefitTypesFilter.length && {
        "filter.benefit.type": `${FilterOperator.IN}:${benefitTypesFilter.join(",")}`,
      }),
    }),
    [page, search, companyIdsFilter, providerIdsFilter, benefitTypesFilter],
  );

  const value: InvoiceParamsContextType = {
    benefitTypesFilter,
    changePage,
    clearFilter,
    hasFilter,
    invoiceParams,
    page,
    search,
    setBenefitTypesFilter,
    setSearch,
    companyIdsFilter,
    setCompanyIdsFilter,
    providerIdsFilter,
    setProviderIdsFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };

  return (
    <InvoiceParamsContext.Provider value={value}>
      {children}
    </InvoiceParamsContext.Provider>
  );
}
