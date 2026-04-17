import { BenefitCardTicket } from "@/services/benefitService";
import { mapTicketToActionType } from "./mapTicketToActionType";

export function mapTicketTopAction(tickets?: BenefitCardTicket[]) {
  const actions =
    tickets?.map((ticket) => ({
      id: ticket?.id ?? "",
      createdAt: ticket?.createdAt ?? "",
      type: mapTicketToActionType(ticket?.operationType),
      movimentations: [
        {
          id: `${ticket?.status}-${ticket?.createdAt}`,
          status: ticket?.status,
          updatedAt: ticket?.createdAt ?? "",
        },
      ],
    })) ?? [];

  return actions;
}
