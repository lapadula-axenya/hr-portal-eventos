import { PolicyStatus, PolicySummary } from "@/services/policyService";

export type MainPoliciesSectionCardProps = {
  status: PolicyStatus;
  policies: PolicySummary[];
  selectedPolicyId: string;
  onChangeSelectedPolicyId: (policyId: string) => void;
};
