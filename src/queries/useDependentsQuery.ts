import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { QueryKey } from "@/enums/QueryKey";
import { getDependents } from "@/services/beneficiaryService";

type UseDependentsQueryProps = {
  enabled: boolean;
  holderId: string;
};

export function useDependentsQuery({
  enabled = true,
  holderId,
}: UseDependentsQueryProps) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [QueryKey.DEPENDENTS, authQueryKey, companyQueryKey, holderId],
    queryFn: () => getDependents(holderId),
    enabled: isCompanyReady && !!enabled && !!holderId,
  });

  return {
    dependents: data,
    isDependentsError: isError,
    isDependentsLoading: isLoading,
  };
}
