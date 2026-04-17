import { ChangeEvent } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { InputSelect, LoadingButton, SelectOption } from "@/components";
import {
  BeneficiaryMovementTemplate,
  BeneficiaryMovementTemplateTranslate,
} from "@/services/ticketService";
import { MainMovimentationsModalSendStepTemplateProps } from "./MainMovimentationsModalSendStepTemplate.props";

const templateOptions: SelectOption[] = Object.values(
  BeneficiaryMovementTemplate,
).map((value) => ({
  value,
  label: `Template ${BeneficiaryMovementTemplateTranslate[value]}`,
}));

export function MainMovimentationsModalSendStepTemplate({
  hasDownloaded,
  hasTemplateFile,
  isDownloading,
  onChangeHasTemplateFile,
  onChangeStep,
  onChangeTemplate,
  onDownload,
  template,
}: MainMovimentationsModalSendStepTemplateProps) {
  const downloadButtonDisabled = isDownloading || !template;

  const nextButtonActive =
    !isDownloading && template && (hasTemplateFile || hasDownloaded);

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeHasTemplateFile(event.target.checked);
  };

  const handleClickDownload = () => {
    if (downloadButtonDisabled) return;
    onDownload();
  };

  const handleClickNextStep = () => {
    if (!nextButtonActive) return;
    onChangeStep();
  };

  return (
    <Stack spacing="2rem">
      <Typography variant="body2" color="grey.100">
        Para garantir que as movimentações sejam processadas corretamente, é
        necessário que o arquivo siga o modelo padrão. Por favor, baixe o
        template abaixo e preencha com os dados necessários.
      </Typography>

      <InputSelect
        label="Tipo de movimentação"
        value={template || ""}
        options={templateOptions}
        disabled={isDownloading}
        onChangeValue={onChangeTemplate}
      />

      <FormControlLabel
        label="Já tenho arquivo pronto usando o template."
        sx={{ width: "max-content" }}
        control={
          <Checkbox
            checked={hasTemplateFile}
            disabled={isDownloading}
            onChange={handleChangeCheckbox}
            disableRipple
          />
        }
      />

      <Stack direction="row" spacing="1rem" justifyContent="end">
        <LoadingButton
          variant="outlined"
          loading={isDownloading}
          disabled={downloadButtonDisabled}
          onClick={handleClickDownload}
        >
          Baixar template
        </LoadingButton>
        <Button disabled={!nextButtonActive} onClick={handleClickNextStep}>
          Continuar
        </Button>
      </Stack>
    </Stack>
  );
}
