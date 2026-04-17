import { QueryKey } from "@/enums/QueryKey";
import { DashboardFilter, getAllDashboards } from "@/services/dashboardService";
import { BaseQueryParams, useBaseQuery } from "./useBaseQuery";

export function useDashboardsQuery(props?: BaseQueryParams<DashboardFilter>) {
  return useBaseQuery({
    queryKey: QueryKey.DASHBOARDS,
    queryFn: getAllDashboards,
    ...props,
  });
}
