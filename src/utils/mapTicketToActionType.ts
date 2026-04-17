import {
  BenefitActionType,
  TicketOperationType,
} from "@/services/benefitService";

export function mapTicketToActionType(
  ticketType?: TicketOperationType,
): BenefitActionType | undefined {
  switch (ticketType) {
    case TicketOperationType.INCLUSION:
    case TicketOperationType.REACTIVATION:
    case TicketOperationType.PLAN_EXTENSION:
      return BenefitActionType.INCLUSION;

    case TicketOperationType.BENEFIT_CHANGE:
    case TicketOperationType.REGISTRATION_CHANGE:
      return BenefitActionType.CHANGE;

    case TicketOperationType.BENEFIT_DELETION:
    case TicketOperationType.BENEFICIARY_DELETION:
      return BenefitActionType.EXCLUSION;

    default:
      return undefined;
  }
}
