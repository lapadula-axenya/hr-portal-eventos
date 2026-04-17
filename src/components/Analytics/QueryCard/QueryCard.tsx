"use client";

import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import { useAnalyticsQueryExecution } from "@/queries/useAnalyticsQueryExecution";
import { AnalyticsQuery } from "@/services/analyticsService";
import { filterParamsForQuery } from "@/utils/filterParamsForQuery";
import { ChartRenderer } from "../ChartRenderer/ChartRenderer";

type Props = {
  query: AnalyticsQuery;
  globalFilters: Record<string, string>;
};

export function QueryCard({ globalFilters, query }: Props) {
  const params = filterParamsForQuery(globalFilters, query);

  const { data, isError, isLoading } = useAnalyticsQueryExecution(
    query.slug,
    params,
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          {query.name}
        </Typography>

        {isLoading && (
          <Stack gap={1}>
            <Skeleton variant="rectangular" height={48} />
            <Skeleton variant="rectangular" height={120} />
          </Stack>
        )}

        {isError && (
          <Typography variant="body2" color="error">
            Erro ao carregar dados.
          </Typography>
        )}

        {!isLoading && !isError && data && (
          <ChartRenderer
            chartType={query.chartType}
            chartConfig={query.chartConfig}
            data={data.data}
          />
        )}
      </CardContent>
    </Card>
  );
}
