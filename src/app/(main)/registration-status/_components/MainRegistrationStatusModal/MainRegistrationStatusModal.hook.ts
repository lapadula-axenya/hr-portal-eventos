import { useBeneficiaryParamsContext } from "@/contexts/BeneficiaryParamsContext";
import { useBeneficiaryQuery } from "@/queries/useBeneficiaryQuery";
import { useDependentsQuery } from "@/queries/useDependentsQuery";
import { BeneficiaryType } from "@/services/beneficiaryService";

export function useMainRegistrationStatusModal() {
  const { modalBeneficiaryId, modalBenefitId } = useBeneficiaryParamsContext();

  const { beneficiary, isBeneficiaryError, isBeneficiaryLoading } =
    useBeneficiaryQuery({ entityId: modalBeneficiaryId });

  const { dependents, isDependentsLoading } = useDependentsQuery({
    holderId: modalBeneficiaryId,
    enabled:
      !!modalBeneficiaryId && beneficiary?.type === BeneficiaryType.HOLDER,
  });

  const benefit = beneficiary?.benefits?.find(
    ({ id }) => id === modalBenefitId,
  );

  return {
    beneficiary,
    benefit,
    dependents,
    isBeneficiaryError,
    isBeneficiaryLoading,
    isDependentsLoading,
  };
}
