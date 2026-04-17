export type ChartConfig = Record<string, unknown>;

export type QueryLayout = {
  row: number;
  col: number;
  width: number;
  height: number;
};

export type AnalyticsQuery = {
  slug: string;
  name: string;
  description: string | null;
  chartType: string | null;
  chartConfig: ChartConfig;
  layout: QueryLayout | null;
  paramsSchema: Array<{
    name: string;
    type: string;
    label?: string;
    required?: boolean;
    default?: unknown;
  }>;
  displayOrder: number;
};

export type DashboardFilter = {
  name: string;
  label: string;
  column: string;
  type: string;
  required: boolean;
  default: string | null;
};

export type AnalyticsDashboard = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  filters: DashboardFilter[] | null;
  bigquerySource: string | null;
};

export type AnalyticsDashboardDetail = AnalyticsDashboard & {
  queries: AnalyticsQuery[];
};

export type ExecuteQueryResponse = {
  data: Record<string, unknown>[];
  cached: boolean;
  queryTimeMs: number;
};
