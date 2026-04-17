import { BeneficiaryMovementTemplate } from "@/services/ticketService";

export type MainMovimentationsModalSendStepTemplateProps = {
  isDownloading: boolean;
  hasDownloaded: boolean;
  template: BeneficiaryMovementTemplate | null;
  hasTemplateFile: boolean;
  onDownload: () => void;
  onChangeStep: () => void;
  onChangeTemplate: (value: string) => void;
  onChangeHasTemplateFile: (value: boolean) => void;
};
