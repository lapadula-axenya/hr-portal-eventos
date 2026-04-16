import { ApiResponse, GetAllParamsDefault } from "@/types/apiResponse";
import { policiesMock, policyDetailsMock } from "./policy.mock";
import { Policy, PolicyFilter, PolicySummary } from "./policyService.type";

export async function getAllPolicies(
  params?: GetAllParamsDefault<PolicyFilter>,
): Promise<ApiResponse<PolicySummary>> {
  const isActive = (params as Record<string, unknown>)?.["filter.isActive"];

  const filtered =
    isActive === "true"
      ? policiesMock.filter((p) => p.status === "ACTIVE")
      : isActive === "false"
        ? policiesMock.filter((p) => p.status !== "ACTIVE")
        : policiesMock;

  return {
    data: filtered,
    meta: {
      itemsPerPage: 10,
      totalItems: filtered.length,
      currentPage: 1,
      totalPages: 1,
    },
  };
}

export async function getPolicy(policyId: string): Promise<Policy> {
  return policyDetailsMock[policyId] ?? policyDetailsMock["pol-001"];
}
