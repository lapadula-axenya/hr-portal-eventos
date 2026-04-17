import { PageHeaderNotificationItemProps } from "@/components";
import { dayjsTz } from "@/lib/dayjsTz";
import {
  FileNotificationStatus,
  FileNotificationStatusLabel,
} from "@/services/notificationService/notificationService.type";

export const fileNotificationStatusMessage: Record<
  FileNotificationStatus,
  string
> = {
  [FileNotificationStatus.UPLOAD_RECEIVED]:
    "O arquivo {fileName} foi recebido com sucesso.",
  [FileNotificationStatus.STAGING_IN_PROGRESS]:
    "O arquivo {fileName} está sendo preparado para processamento.",
  [FileNotificationStatus.STAGING_COMPLETED]:
    "O arquivo {fileName} foi preparado com sucesso.",
  [FileNotificationStatus.PROCESSING]:
    "O arquivo {fileName} está sendo processado.",
  [FileNotificationStatus.COMPLETED]:
    "O arquivo {fileName} foi processado com sucesso.",
  [FileNotificationStatus.FAILED]:
    "O arquivo {fileName} não foi processado corretamente e está com pendências.",
};

export function usePageHeaderNotificationItem({
  notification,
  onClick,
}: PageHeaderNotificationItemProps) {
  const file =
    notification.beneficiaryMovementFileNotification.beneficiaryMovementFile;

  const isFailed = file.failedRows > 0 || !!file.errorMessage;

  const status = isFailed ? FileNotificationStatus.FAILED : file.status;

  const statusLabel = FileNotificationStatusLabel[status];

  const formattedDate = dayjsTz(notification.date).format("ddd, DD [de] MMM");

  const message = fileNotificationStatusMessage[status].replace(
    "{fileName}",
    file.fileName,
  );

  const handleClick = () => onClick(file);

  return {
    isFailed,
    formattedDate,
    message,
    status,
    statusLabel,
    handleClick,
  };
}
