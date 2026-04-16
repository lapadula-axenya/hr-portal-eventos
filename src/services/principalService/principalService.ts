import { AuthRole } from "@/enums/AuthRole";
import { ApiResponse, GetAllParamsDefault } from "../../types/apiResponse";
import {
  CheckIfIsLastAdminPrincipalReturn,
  Principal,
  PrincipalFilter,
  PrincipalStatus,
  PrincipalType,
  UpdatePrincipalRolePayload,
} from "./principalService.type";

export const mockPrincipal: Principal = {
  id: "mock-user-id",
  externalId: null,
  firstName: "Ana",
  lastName: "Silva",
  fullName: "Ana Silva",
  status: PrincipalStatus.ACTIVE,
  type: PrincipalType.CUSTOMER,
  hasDashboardAccess: true,
  roles: [{ name: AuthRole.USER }],
  channel: [{ email: "ana.silva@acme.com.br" }],
  company: {
    id: "acme-001",
    name: "Acme",
    companyId: "acme-001",
  },
};

export async function getMyPrincipal(): Promise<Principal> {
  return mockPrincipal;
}

export async function getAllPrincipals(
  _params?: GetAllParamsDefault<PrincipalFilter>,
): Promise<ApiResponse<Principal>> {
  return {
    data: [mockPrincipal],
    meta: { itemsPerPage: 10, totalItems: 1, currentPage: 1, totalPages: 1 },
  };
}

export async function updatePrincipalRole(
  _principalId: string,
  _payload: UpdatePrincipalRolePayload,
): Promise<void> {}

export async function deactivatePrincipal(_principalId: string): Promise<void> {}

export async function reactivatePrincipal(_principalId: string): Promise<void> {}

export async function checkIfIsLastAdminPrincipal(
  _principalId: string,
): Promise<CheckIfIsLastAdminPrincipalReturn> {
  return { isLastAdmin: false };
}
