import { BeneficiaryType } from "../beneficiaryService";
import { BenefitCardTicket } from "../benefitService";

export type Ticket = {
  id: string;
  beneficiary: {
    id: string;
    name?: string;
    enrollmentNumber?: string;
    type?: BeneficiaryType;
    document?: string;
  };
  tickets: BenefitCardTicket[];
};

export type BeneficiaryMovement = {
  bid?: string;
  name?: string;
  enrollmentNumber?: string;
  subscriberType?: string;
  document?: string;
  tickets: BenefitCardTicket[];
};

export enum TicketFilterSortBy {
  BENEFICIARY_NAME_ASC = "beneficiary.name:ASC",
  BENEFICIARY_NAME_DESC = "beneficiary.name:DESC",
  BENEFICIARY_DOCUMENT_ASC = "beneficiary.document:ASC",
  BENEFICIARY_DOCUMENT_DESC = "beneficiary.document:DESC",
  TICKET_OPERATION_TYPE_ASC = "ticket.operationType:ASC",
  TICKET_OPERATION_TYPE_DESC = "ticket.operationType:DESC",
  TICKET_STATUS_ASC = "ticket.status:ASC",
  TICKET_STATUS_DESC = "ticket.status:DESC",
  TICKET_UPDATED_AT_ASC = "ticket.updatedAt:ASC",
  TICKET_UPDATED_AT_DESC = "ticket.updatedAt:DESC",
}

export type TicketFilter = {
  searchableTerm?: string;
  companyDocument?: string[];
  benefitType?: string[];
  operationType?: string[];
  status?: string[];
};

export type TicketFilterKeys = keyof TicketFilter;

export enum BeneficiaryMovementTemplate {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  REGISTRATION_UPDATE = "REGISTRATION_UPDATE",
}

export enum BeneficiaryMovementTemplateTranslate {
  INSERT = "Inclusão",
  UPDATE = "Alteração de plano",
  DELETE = "Exclusão",
  REGISTRATION_UPDATE = "Alteração de cadastro",
}

export type BeneficiaryMovementUploadConfigPayload = {
  contentType: string;
  movementType: BeneficiaryMovementTemplate;
};

export type BeneficiaryMovementUploadConfig = {
  url: string;
  extensionHeaders: Record<string, string>;
  fileName: string;
};

export type BeneficiaryMovementUploadPayload =
  BeneficiaryMovementUploadConfig & {
    file: File | Blob;
    contentType?: string;
  };
