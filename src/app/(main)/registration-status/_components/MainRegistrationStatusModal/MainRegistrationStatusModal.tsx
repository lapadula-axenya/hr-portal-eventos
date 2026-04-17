import { SideModal } from "@/components";
import { useBeneficiaryParamsContext } from "@/contexts/BeneficiaryParamsContext";
import {
  useMainRegistrationStatusModal,
  MainRegistrationStatusModalStepBeneficiary,
} from "..";
import { MainRegistrationStatusModalStepBenefit } from "../MainRegistrationStatusModalStepBenefit";
import { MainRegistrationStatusModalStepMovimentation } from "../MainRegistrationStatusModalStepMovimentation";

export function MainRegistrationStatusModal() {
  const { closeModal, isOpenModal, modalActionId } =
    useBeneficiaryParamsContext();

  const {
    beneficiary,
    benefit,
    dependents,
    isBeneficiaryError,
    isBeneficiaryLoading,
    isDependentsLoading,
  } = useMainRegistrationStatusModal();

  const showBeneficiary =
    !!beneficiary &&
    !benefit &&
    !modalActionId &&
    !isBeneficiaryLoading &&
    !isBeneficiaryError;

  const showBenefit =
    !!beneficiary &&
    !!benefit &&
    !modalActionId &&
    !isBeneficiaryLoading &&
    !isBeneficiaryError;

  const showMovimentation =
    !!beneficiary &&
    !!benefit &&
    !!modalActionId &&
    !isBeneficiaryLoading &&
    !isBeneficiaryError;

  return (
    <SideModal
      open={isOpenModal}
      onClose={closeModal}
      isLoading={isBeneficiaryLoading}
      isError={isBeneficiaryError}
    >
      {showBeneficiary && (
        <MainRegistrationStatusModalStepBeneficiary
          beneficiary={beneficiary}
          dependents={dependents}
          isDependentsLoading={isDependentsLoading}
        />
      )}

      {showBenefit && (
        <MainRegistrationStatusModalStepBenefit
          beneficiary={beneficiary}
          benefit={benefit}
        />
      )}

      {showMovimentation && (
        <MainRegistrationStatusModalStepMovimentation
          beneficiary={beneficiary}
          benefit={benefit}
        />
      )}
    </SideModal>
  );
}
