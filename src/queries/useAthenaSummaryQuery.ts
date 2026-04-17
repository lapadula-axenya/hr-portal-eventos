import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/enums/QueryKey";
import { AthenaEntityContext, summarizeEntity } from "@/services/athenaService";

type UseAthenaSummaryQueryParams = {
  context?: AthenaEntityContext;
  enabled?: boolean;
};

export function useAthenaSummaryQuery({
  context,
  enabled = true,
}: UseAthenaSummaryQueryParams) {
  return useQuery({
    queryKey: [QueryKey.ATHENA_SUMMARY, context?.type, context?.id],
    queryFn: () => summarizeEntity({ context: context! }),
    enabled: !!context && enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
