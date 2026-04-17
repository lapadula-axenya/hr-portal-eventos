import {
  PolicyStatus,
  PolicySummary,
  PolicySummaryApi,
} from "@/services/policyService";

export function mapPolicySummary(policyApi: PolicySummaryApi) {
  const policy: PolicySummary = {
    id: policyApi.id,
    name: policyApi?.provider ?? "",
    benefitName: `${policyApi?.productType ?? ""} ${policyApi?.contractType ?? ""}`,
    status: policyApi?.isActive ? PolicyStatus.ACTIVE : PolicyStatus.INACTIVE,
    providerUrl: policyApi?.providerUrl ?? "",
  };

  return policy;
}
