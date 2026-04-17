import { QueryKey } from "@/enums/QueryKey";
import { getBeneficiaryMovementFileErrors } from "@/services/ticketService";
import { useBaseInfiniteQuery } from "./useBaseInfiniteQuery";

export function useBeneficiaryMovementFileErrorsQuery(
  fileId: string,
  enabled: boolean,
) {
  return useBaseInfiniteQuery({
    queryKey: QueryKey.BENEFICIARY_MOVEMENT_FILE_ERRORS,
    queryFn: (params) => getBeneficiaryMovementFileErrors(fileId, params),
    queryKeyExtra: [fileId],
    enabled,
  });
}
