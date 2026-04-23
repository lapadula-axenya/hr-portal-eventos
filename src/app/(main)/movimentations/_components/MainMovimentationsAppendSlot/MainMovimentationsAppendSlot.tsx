import { Card, CardContent, Skeleton, Stack } from "@mui/material";
import { useKpisQuery } from "@/queries/useKpiQuery";
import { KpiStatus } from "@/services/kpiService";
import { MainMovimentationsKpi } from "../MainMovimentationsKpi";

function CardSkeleton() {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardContent>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </CardContent>
    </Card>
  );
}

export function MainMovimentationsAppendSlot() {
  const { isKpisLoading, kpi } = useKpisQuery();

  return (
    <Stack direction="row" spacing={{ xs: "8px", md: "24px" }} height="100%">
      {isKpisLoading &&
        Object.values(KpiStatus).map((_, index) => (
          <CardSkeleton key={index} />
        ))}

      {!!kpi &&
        !isKpisLoading &&
        Object.values(KpiStatus).map((status) => (
          <MainMovimentationsKpi
            key={status}
            kpiValues={kpi[status]}
            kpiStatus={status}
          />
        ))}
    </Stack>
  );
}
