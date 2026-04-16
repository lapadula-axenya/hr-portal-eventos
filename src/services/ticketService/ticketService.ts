import { ApiResponse, GetAllParamsDefault } from "@/types/apiResponse";
import { ticketsMock } from "./ticket.mock";
import { BenefitCardTicket, TimeLineEvent } from "../benefitService";
import { BeneficiaryMovementFile } from "../notificationService/notificationService.type";
import {
  BeneficiaryMovementTemplate,
  BeneficiaryMovementUploadConfigPayload,
  BeneficiaryMovementUploadConfig,
  BeneficiaryMovementUploadPayload,
  Ticket,
  TicketFilter,
} from "./ticketService.type";

export async function getAllTickets(
  params?: GetAllParamsDefault<TicketFilter>,
): Promise<ApiResponse<Ticket>> {
  const page = (params as Record<string, unknown>)?.["page"] as number ?? 1;
  const limit = (params as Record<string, unknown>)?.["limit"] as number ?? 10;
  const term = ((params as Record<string, unknown>)?.["searchableTerm"] as string ?? "").toLowerCase();

  let filtered = ticketsMock;

  if (term) {
    filtered = filtered.filter(
      (t) =>
        t.beneficiary.name?.toLowerCase().includes(term) ||
        t.beneficiary.document?.includes(term) ||
        t.beneficiary.enrollmentNumber?.toLowerCase().includes(term),
    );
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const start = (page - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    meta: { itemsPerPage: limit, totalItems, currentPage: page, totalPages },
  };
}

export async function downloadMovimentationTemplate(
  _movementType: BeneficiaryMovementTemplate,
): Promise<void> {}

export async function downloadMovimentationFailedRowsTemplate(
  _file: BeneficiaryMovementFile,
): Promise<void> {}

export async function getBeneficiaryMovementUploadConfig(
  _payload: BeneficiaryMovementUploadConfigPayload,
): Promise<BeneficiaryMovementUploadConfig> {
  return { url: "", extensionHeaders: {}, fileName: "" };
}

export async function beneficiaryMovementUploadUpload(
  _payload: BeneficiaryMovementUploadPayload,
): Promise<void> {}

export async function getTicketByBenefitCardId(
  benefitCardId: string,
): Promise<BenefitCardTicket[]> {
  const ticket = ticketsMock.find((t) =>
    t.tickets.some((tk) => tk.id === benefitCardId || tk.bid === benefitCardId),
  );
  return ticket?.tickets ?? [];
}

export async function getTicketTimeline(ticketId: string): Promise<TimeLineEvent[]> {
  for (const mov of ticketsMock) {
    const found = mov.tickets.find((t) => t.id === ticketId);
    if (found) return found.timeLine ?? [];
  }
  return [];
}

export async function getBeneficiaryMovementFileErrors(
  _fileId: string,
  _params?: unknown,
): Promise<ApiResponse<never>> {
  return { data: [], meta: { itemsPerPage: 10, totalItems: 0, currentPage: 1, totalPages: 0 } };
}
