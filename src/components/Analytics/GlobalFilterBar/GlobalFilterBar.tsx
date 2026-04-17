"use client";

import { useCallback } from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/enums/QueryKey";
import { DashboardFilter, getFilterValues } from "@/services/analyticsService";

type Props = {
  dashboardSlug: string;
  dashboardFilters: DashboardFilter[];
  filters: Record<string, string>;
  onChange: (name: string, value: string) => void;
};

function FilterSelect({
  activeFilters,
  dashboardSlug,
  filter,
  onChange,
  value,
}: {
  dashboardSlug: string;
  filter: DashboardFilter;
  value: string;
  activeFilters: Record<string, string>;
  onChange: (name: string, value: string) => void;
}) {
  const cascadingParams = Object.fromEntries(
    Object.entries(activeFilters).filter(
      ([key, v]) => key !== filter.name && v !== "",
    ),
  );

  const { data: options = [], isLoading } = useQuery({
    queryKey: [
      QueryKey.ANALYTICS_DASHBOARD,
      "filter-values",
      dashboardSlug,
      filter.name,
      cascadingParams,
    ],
    queryFn: () => getFilterValues(dashboardSlug, filter.name, cascadingParams),
    staleTime: 5 * 60 * 1000,
  });

  const handleChange = useCallback(
    (_: unknown, newValue: string | null) => {
      onChange(filter.name, newValue ?? "");
    },
    [filter.name, onChange],
  );

  return (
    <Autocomplete
      value={value || null}
      onChange={handleChange}
      options={options}
      loading={isLoading}
      disableClearable={filter.required}
      size="small"
      sx={{ minWidth: 200 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={filter.label}
          required={filter.required}
        />
      )}
    />
  );
}

export function GlobalFilterBar({
  dashboardFilters,
  dashboardSlug,
  filters,
  onChange,
}: Props) {
  if (!dashboardFilters.length) return null;

  return (
    <Stack direction="row" flexWrap="wrap" gap={2} mb={3}>
      {dashboardFilters.map((filter) => (
        <FilterSelect
          key={filter.name}
          dashboardSlug={dashboardSlug}
          filter={filter}
          value={filters[filter.name] ?? ""}
          activeFilters={filters}
          onChange={onChange}
        />
      ))}
    </Stack>
  );
}
