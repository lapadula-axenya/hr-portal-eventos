import { UsePaginationReturn } from "@/hooks/usePagination";
import { ApiResponseMeta } from "@/types/apiResponse";

export type PageNavigatorProps = {
  meta?: ApiResponseMeta;
  disabled?: boolean;
  pagination: UsePaginationReturn;
  onChange?: () => void;
};
