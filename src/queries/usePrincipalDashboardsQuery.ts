import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { QueryKey } from "@/enums/QueryKey";
import { getPrincipalDashboards } from "@/services/dashboardService";

export function usePrincipalDashboardsQuery(principalId: string) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [
      QueryKey.PRINCIPAL_DASHBOARDS,
      authQueryKey,
      companyQueryKey,
      principalId,
    ],
    queryFn: () => getPrincipalDashboards(principalId),
    enabled: isCompanyReady && !!principalId,
  });

  const uniqueDashboards = Array.from(
    new Map(data?.map((item) => [item.id, item])).values(),
  );

  return {
    principalDashboards: uniqueDashboards,
    isPrincipalDashboardsError: isError,
    isPrincipalDashboardsLoading: isLoading,
  };
}
