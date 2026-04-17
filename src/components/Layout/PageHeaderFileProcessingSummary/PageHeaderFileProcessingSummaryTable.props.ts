import { BeneficiaryMovementFileErrors } from "@/services/benefitService";

export type PageHeaderFileProcessingSummaryTableProps = {
  errors: BeneficiaryMovementFileErrors[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};
