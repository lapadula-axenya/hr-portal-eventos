"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { CenterContainer, OverflowBox, PageContainer } from "@/components";
import { GlobalFilterBar } from "@/components/Analytics/GlobalFilterBar/GlobalFilterBar";
import { QueryCard } from "@/components/Analytics/QueryCard/QueryCard";
import { AppRoutes } from "@/config/appRoutes";
import { useDebounce } from "@/hooks/useDebounce";
import { useAnalyticsDashboardQuery } from "@/queries/useAnalyticsDashboardQuery";

type Props = {
  params: Promise<{ slug: string }>;
};

const GRID_COLUMNS = 24;
const ROW_HEIGHT = 50;

export default function AnalyticsDashboardPage({ params }: Props) {
  const { slug } = use(params);
  const {
    data: dashboard,
    isError,
    isLoading,
  } = useAnalyticsDashboardQuery(slug);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [defaultsApplied, setDefaultsApplied] = useState(false);
  const debouncedFilters = useDebounce(filters, 500);

  // Apply defaults from dashboard.filters on first load
  useEffect(() => {
    if (!dashboard?.filters || defaultsApplied) return;

    const defaults: Record<string, string> = {};
    for (const filter of dashboard.filters) {
      if (filter.default) {
        defaults[filter.name] = filter.default;
      }
    }
    if (Object.keys(defaults).length > 0) {
      setFilters((prev) => ({ ...defaults, ...prev }));
    }
    setDefaultsApplied(true);
  }, [dashboard?.filters, defaultsApplied]);

  const handleFilterChange = useCallback((name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const queries = useMemo(
    () =>
      (dashboard?.queries ?? [])
        .slice()
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [dashboard?.queries],
  );

  const dashboardFilters = dashboard?.filters ?? [];
  const hasLayout = queries.some((q) => q.layout);

  return (
    <PageContainer title={dashboard?.name ?? "Analytics"} isLoading={isLoading}>
      {isError && (
        <CenterContainer>
          <Stack gap={1} alignItems="center">
            <Typography variant="subtitle1">
              Dashboard não encontrado.
            </Typography>
            <Button LinkComponent={Link} href={AppRoutes.MAIN.ANALYTICS}>
              Retornar
            </Button>
          </Stack>
        </CenterContainer>
      )}

      {!isLoading && !isError && dashboard && (
        <OverflowBox>
          <GlobalFilterBar
            dashboardSlug={slug}
            dashboardFilters={dashboardFilters}
            filters={filters}
            onChange={handleFilterChange}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: hasLayout
                ? {
                    xs: "1fr",
                    md: `repeat(${GRID_COLUMNS}, 1fr)`,
                  }
                : {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                  },
              gap: 2,
              gridAutoFlow: "dense",
            }}
          >
            {queries.map((query) => (
              <Box
                key={query.slug}
                sx={{
                  ...(hasLayout && query.layout
                    ? {
                        gridColumn: {
                          xs: "1 / -1",
                          md: `${query.layout.col + 1} / span ${query.layout.width}`,
                        },
                        gridRow: {
                          md: `${query.layout.row + 1} / span ${query.layout.height}`,
                        },
                        minHeight: {
                          md: query.layout.height * ROW_HEIGHT,
                        },
                      }
                    : { gridColumn: { xs: "1 / -1", md: "auto" } }),
                }}
              >
                <QueryCard query={query} globalFilters={debouncedFilters} />
              </Box>
            ))}
          </Box>
        </OverflowBox>
      )}
    </PageContainer>
  );
}
