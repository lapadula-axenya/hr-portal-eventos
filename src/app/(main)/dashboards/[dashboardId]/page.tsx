"use client";

import { use } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CenterContainer, DashboardViewer, PageContainer } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useAuthContext } from "@/contexts/AuthContext";
import { QueryKey } from "@/enums/QueryKey";
import {
  getDashboard,
  getDashboardEmbedUrl,
} from "@/services/dashboardService";
import { getMyPrincipal, Principal } from "@/services/principalService";

type MainDashboardPageProps = {
  params: Promise<{ dashboardId: string }>;
};

export default function MainDashboardPage({ params }: MainDashboardPageProps) {
  const { dashboardId } = use(params);
  const { authQueryKey } = useAuthContext();

  const { data: principal, isLoading: isLoadingPrincipal } =
    useQuery<Principal>({
      queryKey: [QueryKey.PRINCIPAL_ME, ...authQueryKey],
      queryFn: getMyPrincipal,
    });

  const { data: dashboard, isLoading: isLoadingDashboard } = useQuery({
    queryKey: [QueryKey.DASHBOARD, ...authQueryKey, dashboardId],
    queryFn: () => getDashboard(dashboardId),
    enabled: !!dashboardId,
  });

  const { data: url, isLoading: isLoadingEmbedUrl } = useQuery({
    queryKey: [QueryKey.DASHBOARD_EMBED_URL, ...authQueryKey, dashboardId],
    queryFn: () => getDashboardEmbedUrl(dashboard, principal),
    enabled: !!dashboard && !!principal,
    staleTime: 0,
    gcTime: 0,
  });

  const isLoading =
    isLoadingPrincipal || isLoadingEmbedUrl || isLoadingDashboard;
  const hasData = !!dashboard && !!url && !!principal;

  const isEmpty = !url && !isLoadingEmbedUrl;

  return (
    <PageContainer title="Dashboards" isLoading={isLoading}>
      {isEmpty && (
        <CenterContainer>
          <Stack>
            <Typography variant="subtitle1">
              Dashboard não encontrado.
            </Typography>
            <Button LinkComponent={Link} href={AppRoutes.MAIN.DASHBOARDS}>
              Retornar
            </Button>
          </Stack>
        </CenterContainer>
      )}

      {hasData && <DashboardViewer url={url} />}
    </PageContainer>
  );
}
