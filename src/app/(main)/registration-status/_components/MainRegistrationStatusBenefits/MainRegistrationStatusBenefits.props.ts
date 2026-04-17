import { BeneficiarySummary } from "@/services/beneficiaryService";

export type MainRegistrationStatusBenefitsProps = {
  beneficiary?: BeneficiarySummary;
  onClick: (beneficiaryId: string, benefitId: string) => void;
};
