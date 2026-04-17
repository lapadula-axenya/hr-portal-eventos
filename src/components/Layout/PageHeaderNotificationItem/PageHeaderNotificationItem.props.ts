import {
  BeneficiaryMovementFile,
  Notification,
} from "@/services/notificationService/notificationService.type";

export type PageHeaderNotificationItemProps = {
  notification: Notification;
  onClick: (beneficiaryMovementFile: BeneficiaryMovementFile) => void;
};
