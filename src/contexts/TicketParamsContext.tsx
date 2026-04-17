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
import { BenefitCardTicket } from "@/services/benefitService";
import {
  Ticket,
  TicketFilter,
  TicketFilterSortBy,
} from "@/services/ticketService";
import { GetAllParamsDefault } from "@/types/apiResponse";

type TicketParamsContextType = {
  changePage: (_: unknown, newPage: number) => void;
  clearFilter: () => void;
  closeModal: () => void;
  hasFilter: boolean;
  isOpenModal: boolean;
  modalBenefitCardTicket?: BenefitCardTicket;
  modalTicket?: Ticket;
  page: number;
  search: string;
  actionTypesFilter: string[];
  benefitTypesFilter: string[];
  movimentationStatusFilter: string[];
  sortBy?: TicketFilterSortBy;
  setModalBenefitCardTicket: Dispatch<
    SetStateAction<BenefitCardTicket | undefined>
  >;
  subestipulantIdFilter: string[];
  setSubestipulantIdFilter: Dispatch<SetStateAction<string[]>>;
  setModalTicket: Dispatch<SetStateAction<Ticket | undefined>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setActionTypesFilter: Dispatch<SetStateAction<string[]>>;
  setBenefitTypesFilter: Dispatch<SetStateAction<string[]>>;
  setMovimentationStatusFilter: Dispatch<SetStateAction<string[]>>;
  setSortBy: Dispatch<SetStateAction<TicketFilterSortBy | undefined>>;
  ticketParams: GetAllParamsDefault<TicketFilter>;
  isOpenUploadModal: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;
};

const TicketParamsContext = createContext<TicketParamsContextType | undefined>(
  undefined,
);

export function useTicketParamsContext() {
  const context = useContext(TicketParamsContext);
  if (!context) {
    throw new Error(
      "useTicketParamsContext must be used within a TicketParamsProvider",
    );
  }
  return context;
}

export function TicketParamsProvider({ children }: PropsWithChildren) {
  const { changePage, page } = usePagination();

  // TICKET PARAMS
  const [search, setSearch] = useState("");
  const [benefitTypesFilter, setBenefitTypesFilter] = useState<string[]>([]);
  const [actionTypesFilter, setActionTypesFilter] = useState<string[]>([]);
  const [subestipulantIdFilter, setSubestipulantIdFilter] = useState<string[]>(
    [],
  );
  const [movimentationStatusFilter, setMovimentationStatusFilter] = useState<
    string[]
  >([]);
  const [sortBy, setSortBy] = useState<TicketFilterSortBy>();

  const hasFilter =
    !!benefitTypesFilter.length ||
    !!subestipulantIdFilter.length ||
    !!actionTypesFilter.length ||
    !!movimentationStatusFilter.length;

  const clearFilter = () => {
    setBenefitTypesFilter([]);
    setSubestipulantIdFilter([]);
    setActionTypesFilter([]);
    setMovimentationStatusFilter([]);
  };

  const ticketParams: GetAllParamsDefault<TicketFilter> = useMemo(
    () => ({
      page,
      ...(search && {
        searchableTerm: search,
      }),
      ...(!!subestipulantIdFilter.length && {
        subestipulantId: subestipulantIdFilter,
      }),
      ...(!!benefitTypesFilter.length && {
        benefitType: benefitTypesFilter,
      }),
      ...(!!actionTypesFilter.length && {
        operationType: actionTypesFilter,
      }),
      ...(!!movimentationStatusFilter.length && {
        status: movimentationStatusFilter,
      }),
      ...(sortBy && { sortBy }),
    }),
    [
      page,
      search,
      benefitTypesFilter,
      subestipulantIdFilter,
      actionTypesFilter,
      movimentationStatusFilter,
      sortBy,
    ],
  );

  // TICKET MODAL
  const [modalTicket, setModalTicket] = useState<Ticket>();
  const [modalBenefitCardTicket, setModalBenefitCardTicket] =
    useState<BenefitCardTicket>();

  const isOpenModal = !!modalTicket;

  const closeModal = () => {
    setModalTicket(undefined);
    setModalBenefitCardTicket(undefined);
  };

  // UPLOAD MODAL
  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  const openUploadModal = () => setIsOpenUploadModal(true);
  const closeUploadModal = () => setIsOpenUploadModal(false);

  const value: TicketParamsContextType = {
    changePage,
    clearFilter,
    closeModal,
    hasFilter,
    isOpenModal,
    modalBenefitCardTicket,
    modalTicket,
    page,
    search,
    actionTypesFilter,
    benefitTypesFilter,
    movimentationStatusFilter,
    sortBy,
    setModalBenefitCardTicket,
    subestipulantIdFilter,
    setSubestipulantIdFilter,
    setModalTicket,
    setSearch,
    setActionTypesFilter,
    setBenefitTypesFilter,
    setMovimentationStatusFilter,
    setSortBy,
    ticketParams,
    isOpenUploadModal,
    openUploadModal,
    closeUploadModal,
  };

  return (
    <TicketParamsContext.Provider value={value}>
      {children}
    </TicketParamsContext.Provider>
  );
}
