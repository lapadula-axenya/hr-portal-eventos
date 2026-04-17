import {
  Beneficiary,
  BeneficiaryAPI,
  BeneficiaryAPIGender,
  Gender,
} from "@/services/beneficiaryService";
import { calculateAge } from "./calculateAge";
import { mapBeneficiaryApiToSummary } from "./mapBeneficiaryApiToSummary";

export function mapBeneficiaryApiToDetail(
  beneficiary: BeneficiaryAPI,
): Beneficiary {
  const summary = mapBeneficiaryApiToSummary(beneficiary);

  const age = calculateAge(beneficiary?.birthDate);

  const gender =
    beneficiary?.gender === BeneficiaryAPIGender.MALE
      ? Gender.MALE
      : Gender.FEMALE;

  return {
    ...summary,
    phone: beneficiary?.phone ?? "",
    birthday: beneficiary?.birthDate ?? "",
    maritalStatus: beneficiary?.maritalStatus ?? "",
    admissionDate: beneficiary?.admissionDate,
    holder: beneficiary?.holder,
    relationshipWithHolder: beneficiary?.dependencyRelation,
    age,
    gender,
  };
}
