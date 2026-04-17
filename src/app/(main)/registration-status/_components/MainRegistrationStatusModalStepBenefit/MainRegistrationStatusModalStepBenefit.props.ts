import { Beneficiary } from "@/services/beneficiaryService";
import { Benefit } from "@/services/benefitService";

export type MainRegistrationStatusModalStepBenefitProps = {
  beneficiary: Beneficiary;
  benefit: Benefit;
};
