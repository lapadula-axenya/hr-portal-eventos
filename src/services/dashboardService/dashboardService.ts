import { ApiResponse, GetAllParamsDefault } from "@/types/apiResponse";
import { Dashboard, DashboardFilter, PrincipalDashboard } from ".";
import { Principal } from "@/services/principalService";

export async function getAllDashboards(
  _params?: GetAllParamsDefault<DashboardFilter>,
): Promise<ApiResponse<Dashboard>> {
  return {
    data: [],
    meta: { itemsPerPage: 10, totalItems: 0, currentPage: 1, totalPages: 0 },
  };
}

export async function getDashboard(_dashboardId: string): Promise<Dashboard> {
  return {} as Dashboard;
}

export async function getPrincipalDashboards(
  _principalId: string,
): Promise<PrincipalDashboard[]> {
  return [];
}

export async function putPrincipalDashboards(
  _principalId: string,
  _dashboardIds: string[],
): Promise<void> {}

export async function getDashboardEmbedUrl(
  _dashboard?: Dashboard,
  _principal?: Principal,
): Promise<string | null> {
  return null;
}
