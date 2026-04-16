import { ApiResponse, GetAllParamsDefault } from "../../types/apiResponse";
import {
  FileNotificationStatus,
  MarkNotificationsReadPayload,
  Notification,
  NotificationContext,
  NotificationFilter,
} from "./notificationService.type";
import { BeneficiaryMovementTemplate as BeneficiaryMovementTemplateEnum } from "../ticketService";

const notificationsMock: Notification[] = [
  {
    id: "notif-001",
    context: NotificationContext.BENEFICIARY_MOVEMENT_FILE_PROCESS_END,
    date: "2025-04-10T14:30:00Z",
    isRead: false,
    beneficiaryMovementFileNotification: {
      id: "file-notif-001",
      beneficiaryMovementFile: {
        id: "file-001",
        fileName: "inclusao_abril_2025.xlsx",
        movementType: BeneficiaryMovementTemplateEnum.INSERT,
        status: FileNotificationStatus.COMPLETED,
        totalRows: 5,
        successRows: 5,
        failedRows: 0,
        processingFinishedAt: "2025-04-10T14:30:00Z",
      },
    },
  },
  {
    id: "notif-002",
    context: NotificationContext.BENEFICIARY_MOVEMENT_FILE_PROCESS_END,
    date: "2025-03-22T09:15:00Z",
    isRead: true,
    beneficiaryMovementFileNotification: {
      id: "file-notif-002",
      beneficiaryMovementFile: {
        id: "file-002",
        fileName: "exclusao_marco_2025.xlsx",
        movementType: BeneficiaryMovementTemplateEnum.DELETE,
        status: FileNotificationStatus.FAILED,
        totalRows: 3,
        successRows: 1,
        failedRows: 2,
        processingFinishedAt: "2025-03-22T09:15:00Z",
        errorMessage: "Registros com CPF inválido nas linhas 2 e 3.",
      },
    },
  },
  {
    id: "notif-003",
    context: NotificationContext.BENEFICIARY_MOVEMENT_FILE_PROCESS_END,
    date: "2025-02-14T11:00:00Z",
    isRead: true,
    beneficiaryMovementFileNotification: {
      id: "file-notif-003",
      beneficiaryMovementFile: {
        id: "file-003",
        fileName: "atualizacao_cadastral_fev_2025.xlsx",
        movementType: BeneficiaryMovementTemplateEnum.REGISTRATION_UPDATE,
        status: FileNotificationStatus.COMPLETED,
        totalRows: 8,
        successRows: 8,
        failedRows: 0,
        processingFinishedAt: "2025-02-14T11:00:00Z",
      },
    },
  },
];

export async function getNotifications(
  _params?: GetAllParamsDefault<NotificationFilter>,
): Promise<ApiResponse<Notification>> {
  return {
    data: notificationsMock,
    meta: {
      itemsPerPage: 10,
      totalItems: notificationsMock.length,
      currentPage: 1,
      totalPages: 1,
    },
  };
}

export async function markNotificationsAsRead(
  _payload: MarkNotificationsReadPayload,
): Promise<void> {}
