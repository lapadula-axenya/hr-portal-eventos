"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import {
  CenterContainer,
  EllipsisText,
  OverflowBox,
  PageContainer,
  PageNavigator,
} from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useDashboardOnlyContext } from "@/contexts/DashboardOnlyContext";
import { usePagination } from "@/hooks/usePagination";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useDashboardsQuery } from "@/queries/useDashboards";

const MOCK_DASHBOARDS = [
  {
    id: "saude-populacional",
    name: "Saúde Populacional",
    description:
      "Dashboard de saúde populacional com indicadores de absenteísmo, CIDs, OKR e atividade restrita.",
  },
];

export default function MainDashboardsPage() {
  const { containerRef, scrollToTop } = useScrollToTop();
  const { isDashboardOnly } = useDashboardOnlyContext();

  const pagination = usePagination();

  const { dashboards, dashboardsMeta, isDashboardsEmpty, isDashboardsLoading } =
    useDashboardsQuery({
      params: { page: pagination.page },
    });

  const mockDashboards = isDashboardOnly ? MOCK_DASHBOARDS : [];
  const allDashboards = [...mockDashboards, ...dashboards];
  const isEmpty = isDashboardsEmpty && mockDashboards.length === 0;

  return (
    <PageContainer title="Dashboards">
      {isEmpty && (
        <CenterContainer>
          <Typography variant="subtitle1">
            Nenhum dashboard encontrado.
          </Typography>
        </CenterContainer>
      )}

      {!isEmpty && (
        <Stack height="100%" justifyContent="space-between" gap="1rem">
          <OverflowBox ref={containerRef}>
            <Stack
              flexGrow={1}
              display="grid"
              gap={2}
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
            >
              {allDashboards.map((dashboard) => (
                <Card key={dashboard.id}>
                  <CardActionArea
                    LinkComponent={Link}
                    href={`${AppRoutes.MAIN.DASHBOARDS}/${dashboard.id}`}
                    sx={{
                      height: "150px",
                    }}
                  >
                    <CardContent>
                      <EllipsisText variant="h6" lineClamp={2}>
                        {dashboard.name}
                      </EllipsisText>
                      <EllipsisText
                        variant="body2"
                        color="grey.100"
                        lineClamp={2}
                      >
                        {dashboard.description}
                      </EllipsisText>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </OverflowBox>

          <PageNavigator
            pagination={pagination}
            meta={dashboardsMeta}
            disabled={isDashboardsLoading}
            onChange={scrollToTop}
          />
        </Stack>
      )}
    </PageContainer>
  );
}
