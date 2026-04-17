import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { QueryKey } from "@/enums/QueryKey";
import { getKpi } from "@/services/kpiService";

export function useKpisQuery() {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  const { data: kpi, isLoading } = useQuery({
    queryKey: [QueryKey.KPI, authQueryKey, companyQueryKey],
    queryFn: () => getKpi(),
    enabled: isCompanyReady,
  });

  return {
    kpi,
    isKpisLoading: isLoading,
  };
}
