import { QueryKey } from "@/enums/QueryKey";
import { getBeneficiary } from "@/services/beneficiaryService";
import { BaseItemQueryParams, useBaseItemQuery } from "./useBaseItemQuery";

export function useBeneficiaryQuery(props: BaseItemQueryParams) {
  return useBaseItemQuery({
    queryKey: QueryKey.BENEFICIARY,
    queryFn: getBeneficiary,
    ...props,
  });
}
