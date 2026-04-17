import { BaseModal } from "@/components";
import { useTicketParamsContext } from "@/contexts/TicketParamsContext";
import {
  BENEFICIARY_MOVEMENT_UPLOAD_X_CONTENT_TYPE,
  useMainMovimentationsModalSend,
} from ".";
import { MainMovimentationsModalSendStepSuccess } from "../MainMovimentationsModalSendStepSuccess";
import { MainMovimentationsModalSendStepTemplate } from "../MainMovimentationsModalSendStepTemplate";
import { MainMovimentationsModalSendStepUpload } from "../MainMovimentationsModalSendStepUpload";

export function MainMovimentationsModalSend() {
  const { isOpenUploadModal } = useTicketParamsContext();

  const {
    file,
    fileName,
    goToStepTemplate,
    goToStepUpload,
    handleChangeTemplate,
    handleClickDownload,
    handleClose,
    handleUpload,
    hasDownloaded,
    hasTemplateFile,
    isDownloading,
    isError,
    isLoading,
    isStepSuccess,
    isStepTemplate,
    isStepUpload,
    modalTitle,
    setFile,
    setHasTemplateFile,
    template,
  } = useMainMovimentationsModalSend();

  return (
    <BaseModal
      open={isOpenUploadModal}
      title={modalTitle}
      onClose={handleClose}
      {...(isStepUpload && {
        onReturn: goToStepTemplate,
      })}
    >
      {isOpenUploadModal && isStepTemplate && (
        <MainMovimentationsModalSendStepTemplate
          hasTemplateFile={hasTemplateFile}
          onChangeHasTemplateFile={setHasTemplateFile}
          template={template}
          isDownloading={isDownloading}
          hasDownloaded={hasDownloaded}
          onDownload={handleClickDownload}
          onChangeTemplate={handleChangeTemplate}
          onChangeStep={goToStepUpload}
        />
      )}

      {isOpenUploadModal && isStepUpload && (
        <MainMovimentationsModalSendStepUpload
          file={file}
          isLoading={isLoading}
          isError={isError}
          onChange={setFile}
          acceptedFileTypes={[BENEFICIARY_MOVEMENT_UPLOAD_X_CONTENT_TYPE]}
          acceptedFileExtensions={[".xlsx"]}
          onChangeStep={goToStepTemplate}
          onSend={handleUpload}
        />
      )}

      {isOpenUploadModal && isStepSuccess && (
        <MainMovimentationsModalSendStepSuccess
          fileName={fileName}
          onClose={handleClose}
        />
      )}
    </BaseModal>
  );
}
