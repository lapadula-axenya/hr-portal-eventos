"use client";

import { Typography } from "@mui/material";
import { ChartConfig } from "@/services/analyticsService";

type Props = {
  chartConfig: ChartConfig;
  data: Record<string, unknown>[];
};

function formatValue(value: unknown, unit?: string): string {
  if (value === null || value === undefined) return "—";
  const num = Number(value);
  if (isNaN(num)) return String(value);

  const formatted =
    num % 1 === 0
      ? num.toLocaleString("pt-BR")
      : num.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

  return unit ? `${formatted} ${unit}` : formatted;
}

export function KpiCard({ chartConfig, data }: Props) {
  const row = data[0] ?? {};
  const valueColumn = chartConfig.valueColumn as string | undefined;
  const label = chartConfig.label as string | undefined;
  const unit = chartConfig.unit as string | undefined;
  const value = valueColumn ? row[valueColumn] : undefined;

  return (
    <>
      <Typography variant="h4" fontWeight={700} color="primary.main">
        {formatValue(value, unit)}
      </Typography>
      {label && (
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {label}
        </Typography>
      )}
    </>
  );
}
