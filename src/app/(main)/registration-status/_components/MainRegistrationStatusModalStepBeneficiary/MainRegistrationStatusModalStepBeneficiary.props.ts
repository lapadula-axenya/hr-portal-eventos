import { Beneficiary, Dependent } from "@/services/beneficiaryService";

export type MainRegistrationStatusModalStepBeneficiaryProps = {
  beneficiary: Beneficiary;
  dependents?: Dependent[];
  isDependentsLoading: boolean;
};
