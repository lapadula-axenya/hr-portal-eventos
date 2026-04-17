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
import { BeneficiaryFilter } from "@/services/beneficiaryService";
import { GetAllParamsDefault } from "@/types/apiResponse";

type BeneficiaryParamsContextType = {
  page: number;
  changePage: (_: unknown, newPage: number) => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selectedBeneficiaryTypes: string[];
  setSelectedBeneficiaryTypes: Dispatch<SetStateAction<string[]>>;
  selectedSubestipulantIdFilter: string[];
  setSelectedSubestipulantIdFilter: Dispatch<SetStateAction<string[]>>;
  selectedBenefitTypes: string[];
  setSelectedBenefitTypes: Dispatch<SetStateAction<string[]>>;
  beneficiaryParams: GetAllParamsDefault<BeneficiaryFilter>;
  isOpenModal: boolean;
  modalBeneficiaryId: string;
  modalBenefitId: string;
  modalActionId: string;
  hasFilter: boolean;
  clearFilter: () => void;
  setModalBeneficiaryId: Dispatch<SetStateAction<string>>;
  setModalBenefitId: Dispatch<SetStateAction<string>>;
  setModalActionId: Dispatch<SetStateAction<string>>;
  closeModal: () => void;
};

const BeneficiaryParamsContext = createContext<
  BeneficiaryParamsContextType | undefined
>(undefined);

export function useBeneficiaryParamsContext() {
  const context = useContext(BeneficiaryParamsContext);
  if (!context) {
    throw new Error(
      "useBeneficiaryParamsContext must be used within a BeneficiaryParamsProvider",
    );
  }
  return context;
}

export function BeneficiaryParamsProvider({ children }: PropsWithChildren) {
  const { changePage, page } = usePagination();

  // BENEFICARY PARAMS
  const [search, setSearch] = useState("");
  const [selectedBeneficiaryTypes, setSelectedBeneficiaryTypes] = useState<
    string[]
  >([]);
  const [selectedSubestipulantIdFilter, setSelectedSubestipulantIdFilter] =
    useState<string[]>([]);
  const [selectedBenefitTypes, setSelectedBenefitTypes] = useState<string[]>(
    [],
  );

  const hasFilter =
    !!selectedBeneficiaryTypes.length ||
    !!selectedSubestipulantIdFilter.length ||
    !!selectedBenefitTypes.length;

  const clearFilter = () => {
    setSelectedBeneficiaryTypes([]);
    setSelectedSubestipulantIdFilter([]);
    setSelectedBenefitTypes([]);
  };

  const beneficiaryParams: GetAllParamsDefault<BeneficiaryFilter> = useMemo(
    () => ({
      page,
      ...(search && { searchableTerm: search }),
      ...(!!selectedBeneficiaryTypes.length && {
        subscriberType: selectedBeneficiaryTypes[0],
      }),
      ...(!!selectedSubestipulantIdFilter.length && {
        subestipulantId: selectedSubestipulantIdFilter,
      }),
      ...(!!selectedBenefitTypes.length && {
        benefitType: selectedBenefitTypes,
      }),
    }),
    [
      page,
      search,
      selectedBeneficiaryTypes,
      selectedSubestipulantIdFilter,
      selectedBenefitTypes,
    ],
  );

  // BENEFICIARY MODAL
  const [modalBeneficiaryId, setModalBeneficiaryId] = useState("");
  const [modalBenefitId, setModalBenefitId] = useState("");
  const [modalActionId, setModalActionId] = useState("");

  const isOpenModal = !!modalBeneficiaryId;

  const closeModal = () => {
    setModalBeneficiaryId("");
    setModalBenefitId("");
    setModalActionId("");
  };

  const value: BeneficiaryParamsContextType = {
    page,
    changePage,
    search,
    setSearch,
    selectedBeneficiaryTypes,
    setSelectedBeneficiaryTypes,
    selectedSubestipulantIdFilter,
    setSelectedSubestipulantIdFilter,
    selectedBenefitTypes,
    setSelectedBenefitTypes,
    hasFilter,
    clearFilter,
    beneficiaryParams,
    isOpenModal,
    modalBeneficiaryId,
    setModalBeneficiaryId,
    modalBenefitId,
    setModalBenefitId,
    modalActionId,
    setModalActionId,
    closeModal,
  };

  return (
    <BeneficiaryParamsContext.Provider value={value}>
      {children}
    </BeneficiaryParamsContext.Provider>
  );
}
