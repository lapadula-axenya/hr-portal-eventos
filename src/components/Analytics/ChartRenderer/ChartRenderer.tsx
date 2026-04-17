"use client";

import { ChartConfig } from "@/services/analyticsService";
import { AnalyticsChart } from "../AnalyticsChart/AnalyticsChart";
import { DataTable } from "../DataTable/DataTable";
import { KpiCard } from "../KpiCard/KpiCard";

type Props = {
  chartType: string | null;
  chartConfig: ChartConfig;
  data: Record<string, unknown>[];
};

export function ChartRenderer({ chartConfig, chartType, data }: Props) {
  const type = chartType?.toUpperCase() ?? "TABLE";

  if (type === "KPI") {
    return <KpiCard data={data} chartConfig={chartConfig} />;
  }

  if (type === "ECHARTS") {
    return <AnalyticsChart data={data} chartConfig={chartConfig} />;
  }

  return <DataTable data={data} chartConfig={chartConfig} />;
}
