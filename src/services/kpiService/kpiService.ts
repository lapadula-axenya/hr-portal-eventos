import { Kpi, KpiStatus } from "./kpiService.type";

export async function getKpi(): Promise<Kpi> {
  return {
    [KpiStatus.IN_PROGRESS]: { today: "2", yesterday: "3" },
    [KpiStatus.PENDING]: { today: "1", yesterday: "2" },
    [KpiStatus.COMPLETED]: { today: "7", yesterday: "5" },
  };
}
