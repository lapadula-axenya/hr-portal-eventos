import {
  Benefit,
  BenefitCardProductTypeToBenefitType,
  BenefitCardTicket,
  BenefitStatus,
} from "@/services/benefitService";
import { mapTicketTopAction } from "./mapTicketTopAction";

export function mapMovementTicketToBenefit(
  ticket?: BenefitCardTicket,
): Benefit[] {
  if (!ticket) return [];

  const mapped: Benefit[] = ticket.benefit.map((benefit) => {
    const name = `${benefit?.planLevel} - ${benefit?.accommodationType}`;

    const type = benefit?.productType
      ? BenefitCardProductTypeToBenefitType[benefit.productType]
      : undefined;

    const actions = mapTicketTopAction([ticket]);

    return {
      id: `${benefit?.id}`,
      cardNumber: ticket?.cardNumber,
      provider: benefit?.provider,
      name,
      type,
      actions,
      status: benefit?.isActive ? BenefitStatus.ACTIVE : BenefitStatus.INACTIVE,
    };
  });

  return mapped;
}
