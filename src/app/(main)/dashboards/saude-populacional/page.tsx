"use client";

import { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { MockDashboard, PageContainer } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useDashboardOnlyContext } from "@/contexts/DashboardOnlyContext";

export default function SaudePopulacionalDashboardPage() {
  const { isDashboardOnly } = useDashboardOnlyContext();
  const router = useRouter();

  useEffect(() => {
    if (!isDashboardOnly) {
      router.replace(AppRoutes.MAIN.DASHBOARDS);
    }
  }, [isDashboardOnly, router]);

  if (!isDashboardOnly)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <PageContainer title="Dashboards">
      <MockDashboard />
    </PageContainer>
  );
}
