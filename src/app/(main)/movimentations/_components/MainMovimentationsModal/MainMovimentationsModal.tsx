import { SideModal } from "@/components";
import { useTicketParamsContext } from "@/contexts/TicketParamsContext";
import { MainMovimentationsModalStepBenefit } from "../MainMovimentationsModalStepBenefit";
import { MainMovimentationsModalStepTicket } from "../MainMovimentationsModalStepTicket";

export function MainMovimentationsModal() {
  const { closeModal, isOpenModal, modalBenefitCardTicket, modalTicket } =
    useTicketParamsContext();

  const showTicket = !!modalTicket && !modalBenefitCardTicket;
  const showBenefit = !!modalTicket && !!modalBenefitCardTicket;

  return (
    <SideModal open={isOpenModal} onClose={closeModal}>
      {showTicket && <MainMovimentationsModalStepTicket />}
      {showBenefit && <MainMovimentationsModalStepBenefit />}
    </SideModal>
  );
}
