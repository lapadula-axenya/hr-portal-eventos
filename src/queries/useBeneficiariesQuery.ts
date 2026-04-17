import { QueryKey } from "@/enums/QueryKey";
import {
  BeneficiaryFilter,
  getAllBeneficiaries,
} from "@/services/beneficiaryService";
import { BaseQueryParams, useBaseQuery } from "./useBaseQuery";

export function useBeneficiariesQuery(
  props?: BaseQueryParams<BeneficiaryFilter>,
) {
  return useBaseQuery({
    queryKey: QueryKey.BENEFICIARIES,
    queryFn: getAllBeneficiaries,
    ...props,
  });
}
