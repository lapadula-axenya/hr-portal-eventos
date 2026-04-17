"use client";

import ReactECharts from "echarts-for-react";
import { ChartConfig } from "@/services/analyticsService";

type Props = {
  chartConfig: ChartConfig;
  data: Record<string, unknown>[];
};

export function AnalyticsChart({ chartConfig, data }: Props) {
  const option = {
    ...chartConfig,
    dataset: { source: data },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", minHeight: "300px", width: "100%" }}
      opts={{ renderer: "svg" }}
      notMerge
    />
  );
}
