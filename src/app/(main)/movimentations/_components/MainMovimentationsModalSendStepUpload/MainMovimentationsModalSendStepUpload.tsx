import { Stack, Typography } from "@mui/material";
import { PaperclipIcon } from "lucide-react";
import { ActionButtons, InputDragAndDrop } from "@/components";
import { MainMovimentationsModalSendStepUploadProps } from "./MainMovimentationsModalSendStepUpload.props";

export function MainMovimentationsModalSendStepUpload({
  acceptedFileExtensions,
  acceptedFileTypes,
  file,
  isError,
  isLoading,
  onChange,
  onChangeStep,
  onSend,
}: MainMovimentationsModalSendStepUploadProps) {
  const handleClickSecondaryButton = () => {
    if (isLoading) return;
    onChangeStep();
  };

  const handleClickPrimaryButton = () => {
    if (isLoading) return;
    onSend();
  };

  const disabledPrimaryButton = !file || (file && isError);

  return (
    <Stack spacing="2rem">
      <Typography variant="body2" color="grey.100">
        Agora, selecione seu arquivo com o template preenchido que você deseja
        enviar.
      </Typography>

      {!file && (
        <InputDragAndDrop
          onChange={onChange}
          disabled={isLoading}
          acceptedFileTypes={acceptedFileTypes}
          acceptedFileExtensions={acceptedFileExtensions}
        />
      )}

      {file && !isError && (
        <Stack
          direction="row"
          spacing="0.5rem"
          alignItems="center"
          color="primary.main"
        >
          <PaperclipIcon size={16} />
          <Typography variant="body2">{file.name}</Typography>
        </Stack>
      )}

      {isError && (
        <Stack
          direction="row"
          spacing="0.5rem"
          alignItems="center"
          color="error.main"
        >
          <PaperclipIcon size={16} />
          <Typography variant="body2">
            Erro ao enviar o arquivo. Tente novamente.
          </Typography>
        </Stack>
      )}

      <ActionButtons
        primaryButtonLabel="Enviar"
        loading={isLoading}
        disabledPrimaryButton={disabledPrimaryButton}
        onClickPrimaryButton={handleClickPrimaryButton}
        onClickSecondaryButton={handleClickSecondaryButton}
      />
    </Stack>
  );
}
