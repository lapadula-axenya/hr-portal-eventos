import { useState } from "react";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { useTicketParamsContext } from "@/contexts/TicketParamsContext";
import {
  BeneficiaryMovementTemplate,
  beneficiaryMovementUploadUpload,
  downloadMovimentationTemplate,
  getBeneficiaryMovementUploadConfig,
} from "@/services/ticketService";
import { MainMovimentationsModalSendStep } from ".";

export const BENEFICIARY_MOVEMENT_UPLOAD_X_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export function useMainMovimentationsModalSend() {
  const { closeUploadModal } = useTicketParamsContext();

  const { openSnackbar } = useSnackbarContext();

  const [step, setStep] = useState<MainMovimentationsModalSendStep>(
    MainMovimentationsModalSendStep.TEMPLATE,
  );

  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasTemplateFile, setHasTemplateFile] = useState(false);
  const [template, setTemplate] = useState<BeneficiaryMovementTemplate | null>(
    null,
  );

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isStepTemplate = step === MainMovimentationsModalSendStep.TEMPLATE;
  const isStepUpload = step === MainMovimentationsModalSendStep.UPLOAD;
  const isStepSuccess = step === MainMovimentationsModalSendStep.SUCCESS;

  const modalTitle =
    isStepTemplate || isStepUpload ? "Enviar movimentações" : "";

  const goToStepTemplate = () => {
    if (file || isError) {
      setIsError(false);
      setFile(null);
      setFileName("");
      return;
    }
    setStep(MainMovimentationsModalSendStep.TEMPLATE);
  };

  const goToStepUpload = () => {
    setStep(MainMovimentationsModalSendStep.UPLOAD);
  };

  const handleChangeTemplate = (newTemplate: string) => {
    if (
      Object.values(BeneficiaryMovementTemplate).includes(
        newTemplate as BeneficiaryMovementTemplate,
      )
    ) {
      setTemplate(newTemplate as BeneficiaryMovementTemplate);
    }
  };

  const handleClose = () => {
    if (isDownloading || isLoading) return;

    if (isStepUpload) {
      goToStepTemplate();
      return;
    }

    closeUploadModal();
    setHasTemplateFile(false);
    setHasDownloaded(false);
    setIsLoading(false);
    setTemplate(null);
    setIsError(false);
    setFile(null);
    setFileName("");
    setStep(MainMovimentationsModalSendStep.TEMPLATE);
  };

  const handleClickDownload = async () => {
    if (!template || isDownloading) return;

    setIsDownloading(true);

    try {
      await downloadMovimentationTemplate(template);
      setHasDownloaded(true);
      openSnackbar({
        text: "Template baixado com sucesso!",
      });
    } catch {
      openSnackbar({
        text: "Erro ao baixar template.",
        type: "error",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUpload = async () => {
    if (isLoading || !file || !template) return;

    setIsLoading(true);

    try {
      const uploadConfig = await getBeneficiaryMovementUploadConfig({
        contentType: BENEFICIARY_MOVEMENT_UPLOAD_X_CONTENT_TYPE,
        movementType: template,
      });

      await beneficiaryMovementUploadUpload({
        ...uploadConfig,
        file,
        contentType: BENEFICIARY_MOVEMENT_UPLOAD_X_CONTENT_TYPE,
      });

      setFileName(uploadConfig.fileName);

      setStep(MainMovimentationsModalSendStep.SUCCESS);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    file,
    modalTitle,
    fileName,
    handleClickDownload,
    handleClose,
    goToStepTemplate,
    goToStepUpload,
    hasDownloaded,
    isDownloading,
    isError,
    isLoading,
    isStepTemplate,
    isStepUpload,
    isStepSuccess,
    template,
    handleChangeTemplate,
    setFile,
    handleUpload,
    hasTemplateFile,
    setHasTemplateFile,
  };
}
