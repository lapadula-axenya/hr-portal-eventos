"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { QueryKey } from "@/enums/QueryKey";
import { executeAnalyticsQuery } from "@/services/analyticsService";

export function useAnalyticsQueryExecution(
  slug: string,
  params: Record<string, unknown> = {},
  options: { enabled?: boolean } = {},
) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  return useQuery({
    queryKey: [
      QueryKey.ANALYTICS_QUERY_EXECUTION,
      slug,
      params,
      authQueryKey,
      companyQueryKey,
    ],
    queryFn: () => executeAnalyticsQuery(slug, params),
    enabled: isCompanyReady && !!slug && (options.enabled ?? true),
    staleTime: 5 * 60 * 1000, // 5 minutes — aligned with backend cache TTL
  });
}
