import { Stack, Typography } from "@mui/material";
import {
  BaseModal,
  LoadingButton,
  PageHeaderFileProcessingSummaryProps,
  PageHeaderFileProcessingSummaryTable,
  pageHeaderFileProcessingSummaryContainerStyles,
  pageHeaderFileProcessingSummaryFailedRowsLabelStyles,
  pageHeaderFileProcessingSummarySuccessRowsLabelStyles,
  pageHeaderFileProcessingSummaryTextStyles,
  usePageHeaderFileProcessingSummary,
} from "@/components";

export function PageHeaderFileProcessingSummary({
  beneficiaryMovementFile,
  onClose,
  open,
}: PageHeaderFileProcessingSummaryProps) {
  const {
    beneficiaryMovementFileErrors,
    failedRowsLabel,
    fetchBeneficiaryMovementFileErrorsNextPage,
    handleClickDownload,
    hasBeneficiaryMovementFileErrorsNextPage,
    isBeneficiaryMovementFileErrorsFetchingNextPage,
    isBeneficiaryMovementFileErrorsLoading,
    isDownloading,
    showErrors,
    successRowsLabel,
  } = usePageHeaderFileProcessingSummary({
    beneficiaryMovementFile,
  });

  return (
    <BaseModal
      title="Resumo do envio"
      open={open}
      onClose={onClose}
      big={showErrors}
    >
      <Stack {...pageHeaderFileProcessingSummaryContainerStyles}>
        {!showErrors && !!beneficiaryMovementFile.errorMessage && (
          <Typography {...pageHeaderFileProcessingSummaryTextStyles}>
            {beneficiaryMovementFile.errorMessage}
          </Typography>
        )}

        {showErrors && (
          <>
            <Typography {...pageHeaderFileProcessingSummaryTextStyles}>
              O arquivo {beneficiaryMovementFile.fileName} apresentou erros em
              algumas movimentações. Foi gerado um novo arquivo apenas com os
              registros com erro. Baixe esse arquivo, corrija e envie somente
              esses registros para novo processamento. As demais movimentações
              já foram processadas corretamente.
            </Typography>

            <Stack>
              <Typography
                {...pageHeaderFileProcessingSummarySuccessRowsLabelStyles}
              >
                {successRowsLabel}
              </Typography>
              <Typography
                {...pageHeaderFileProcessingSummaryFailedRowsLabelStyles}
              >
                {failedRowsLabel}
              </Typography>
            </Stack>

            <PageHeaderFileProcessingSummaryTable
              errors={beneficiaryMovementFileErrors}
              fetchNextPage={fetchBeneficiaryMovementFileErrorsNextPage}
              hasNextPage={!!hasBeneficiaryMovementFileErrorsNextPage}
              isFetchingNextPage={
                isBeneficiaryMovementFileErrorsFetchingNextPage
              }
              isLoading={isBeneficiaryMovementFileErrorsLoading}
            />
            <Stack alignItems="end">
              <LoadingButton
                variant="outlined"
                loading={isDownloading}
                onClick={handleClickDownload}
              >
                Baixar arquivo com erros
              </LoadingButton>
            </Stack>
          </>
        )}
      </Stack>
    </BaseModal>
  );
}
