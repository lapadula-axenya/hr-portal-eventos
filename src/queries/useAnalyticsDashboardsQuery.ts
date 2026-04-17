import { QueryKey } from "@/enums/QueryKey";
import { getAllAnalyticsDashboards } from "@/services/analyticsService";
import { useBaseQuery } from "./useBaseQuery";

export function useAnalyticsDashboardsQuery() {
  return useBaseQuery({
    queryKey: QueryKey.ANALYTICS_DASHBOARDS,
    queryFn: getAllAnalyticsDashboards,
  });
}
