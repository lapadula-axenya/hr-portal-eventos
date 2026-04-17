import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { QueryKey } from "@/enums/QueryKey";
import { getPolicy } from "@/services/policyService";

export function usePolicyQuery(policyId: string) {
  const { authQueryKey } = useAuthContext();

  const {
    data: policy,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QueryKey.POLICY, authQueryKey, policyId],
    queryFn: () => getPolicy(policyId),
    enabled: !!policyId,
  });

  return {
    policy,
    isPolicyLoading: isLoading,
    isPolicyEmpty: !policy && !isLoading,
    isPolicyError: isError,
  };
}
