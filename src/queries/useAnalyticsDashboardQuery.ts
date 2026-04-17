"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { QueryKey } from "@/enums/QueryKey";
import { getAnalyticsDashboard } from "@/services/analyticsService";

export function useAnalyticsDashboardQuery(slug: string) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  return useQuery({
    queryKey: [
      QueryKey.ANALYTICS_DASHBOARD,
      slug,
      authQueryKey,
      companyQueryKey,
    ],
    queryFn: () => getAnalyticsDashboard(slug),
    enabled: isCompanyReady && !!slug,
  });
}
