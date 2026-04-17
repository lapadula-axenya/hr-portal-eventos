import { FilterExpression, FilterOperator } from "@/types/filterOperator";
import { BeneficiaryMovementTemplate } from "../ticketService";

export enum NotificationContext {
  SIGNUP_LINK = "SIGNUP_LINK",
  PASSWORD_RESET = "PASSWORD_RESET",
  BENEFICIARY_MOVEMENT_FILE_PROCESS_END = "BENEFICIARY_MOVEMENT_FILE_PROCESS_END",
}

export enum NotificationContextTranslate {
  SIGNUP_LINK = "Link de cadastro",
  PASSWORD_RESET = "Redefinição de senha",
  BENEFICIARY_MOVEMENT_FILE_PROCESS_END = "Arquivo de movimentação de beneficiários processado",
}

export enum FileNotificationStatus {
  UPLOAD_RECEIVED = "UPLOAD_RECEIVED",
  STAGING_IN_PROGRESS = "STAGING_IN_PROGRESS",
  STAGING_COMPLETED = "STAGING_COMPLETED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum FileNotificationStatusLabel {
  UPLOAD_RECEIVED = "Upload do arquivo recebido!",
  STAGING_IN_PROGRESS = "Preparando arquivo para processamento...",
  STAGING_COMPLETED = "Arquivo preparado com sucesso!",
  PROCESSING = "Processando arquivo...",
  COMPLETED = "Arquivo processado com sucesso!",
  FAILED = "Falha ao processar arquivo!",
}

export type BeneficiaryMovementFile = {
  id: string;
  fileName: string;
  movementType: BeneficiaryMovementTemplate;
  status: FileNotificationStatus;
  totalRows: number;
  successRows: number;
  failedRows: number;
  processingFinishedAt: string;
  errorMessage?: string;
};

export type FileNotification = {
  id: string;
  beneficiaryMovementFile: BeneficiaryMovementFile;
};

export type Notification = {
  id: string;
  context: NotificationContext;
  date: string;
  isRead: boolean;
  beneficiaryMovementFileNotification: FileNotification;
};

export type NotificationFilter = {
  "filter.context"?: FilterExpression<FilterOperator.EQ, NotificationContext>;
  "filter.isRead"?: FilterExpression<FilterOperator.EQ, "true" | "false">;
};

export type NotificationFilterKeys = keyof NotificationFilter;

export type MarkNotificationsReadPayload = {
  notificationIds: string[];
};
