import {
  BeneficiarySubscriberType,
  BeneficiaryType,
} from "@/services/beneficiaryService";
import {
  BenefitCardProductTypeToBenefitType,
  BenefitCardTicket,
} from "@/services/benefitService";
import { BeneficiaryMovement, Ticket } from "@/services/ticketService";
import { mapTicketToActionType } from "./mapTicketToActionType";

export function mapBeneficiaryMovimentToTicket(
  movement: BeneficiaryMovement,
): Ticket {
  const type =
    movement?.subscriberType === BeneficiarySubscriberType.HOLDER
      ? BeneficiaryType.HOLDER
      : BeneficiaryType.DEPENDENT;

  const beneficiary = {
    id: movement?.bid ?? "",
    name: movement?.name ?? "",
    enrollmentNumber: movement?.enrollmentNumber,
    document: movement?.document ?? "",
    type,
  };

  const tickets: BenefitCardTicket[] =
    movement.tickets?.map((ticket) => ({
      ...ticket,
      benefitType: ticket?.productType
        ? BenefitCardProductTypeToBenefitType[ticket?.productType]
        : undefined,
      benefitActionType: mapTicketToActionType(ticket?.operationType),
    })) ?? [];

  return {
    id: movement?.bid ?? "",
    beneficiary,
    tickets,
  };
}
