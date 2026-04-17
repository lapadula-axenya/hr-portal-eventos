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
} from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useAnalyticsDashboardsQuery } from "@/queries/useAnalyticsDashboardsQuery";

export default function AnalyticsPage() {
  const {
    analyticsDashboards,
    isAnalyticsDashboardsEmpty,
    isAnalyticsDashboardsLoading,
  } = useAnalyticsDashboardsQuery();

  return (
    <PageContainer title="Analytics">
      {isAnalyticsDashboardsEmpty && !isAnalyticsDashboardsLoading && (
        <CenterContainer>
          <Typography variant="subtitle1">
            Nenhum dashboard disponível.
          </Typography>
        </CenterContainer>
      )}

      {!isAnalyticsDashboardsEmpty && (
        <OverflowBox>
          <Stack
            display="grid"
            gap={2}
            gridTemplateColumns={{
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
          >
            {analyticsDashboards.map((dashboard) => (
              <Card key={dashboard.id}>
                <CardActionArea
                  LinkComponent={Link}
                  href={`${AppRoutes.MAIN.ANALYTICS}/${dashboard.slug}`}
                  sx={{ height: "150px" }}
                >
                  <CardContent>
                    <EllipsisText variant="h6" lineClamp={2}>
                      {dashboard.name}
                    </EllipsisText>
                    {dashboard.description && (
                      <EllipsisText
                        variant="body2"
                        color="grey.100"
                        lineClamp={2}
                      >
                        {dashboard.description}
                      </EllipsisText>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </OverflowBox>
      )}
    </PageContainer>
  );
}
