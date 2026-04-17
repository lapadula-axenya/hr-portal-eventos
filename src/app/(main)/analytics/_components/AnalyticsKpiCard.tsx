"use client";

import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export interface AnalyticsKpiCardProps {
  label: string;
  value: string;
  delta?: { label: string; positive: boolean };
  footnote?: string;
  isLoading?: boolean;
}

export function AnalyticsKpiCard({
  label,
  value,
  delta,
  footnote,
  isLoading,
}: AnalyticsKpiCardProps) {
  if (isLoading) {
    return (
      <Card variant="outlined" sx={{ flex: 1, minWidth: 0 }}>
        <CardContent>
          <Skeleton variant="text" width="60%" sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="45%" height={36} />
          <Skeleton variant="text" width="30%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ flex: 1, minWidth: 0 }}>
      <CardContent sx={{ pb: "12px !important" }}>
        <Typography variant="caption" color="grey.100" display="block" mb={0.5}>
          {label}
        </Typography>
        <Typography variant="h5" fontWeight={600} color="white" sx={{ lineHeight: 1.2 }}>
          {value}
        </Typography>
        {delta && (
          <Stack direction="row" alignItems="center" gap={0.5} mt={0.5}>
            {delta.positive ? (
              <TrendingUpIcon size={13} color="#44A047" />
            ) : (
              <TrendingDownIcon size={13} color="#F44336" />
            )}
            <Typography
              variant="caption"
              color={delta.positive ? "success.main" : "error.main"}
            >
              {delta.label}
            </Typography>
          </Stack>
        )}
        {footnote && (
          <Typography variant="caption" color="grey.100" display="block" mt={0.5}>
            {footnote}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
