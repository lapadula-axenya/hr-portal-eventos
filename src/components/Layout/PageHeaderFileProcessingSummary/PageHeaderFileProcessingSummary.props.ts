import { BeneficiaryMovementFile } from "@/services/notificationService/notificationService.type";

export type PageHeaderFileProcessingSummaryProps = {
  open: boolean;
  beneficiaryMovementFile: BeneficiaryMovementFile;
  onClose: () => void;
};

export type UsePageHeaderFileProcessingSummaryProps = {
  beneficiaryMovementFile: BeneficiaryMovementFile;
};
