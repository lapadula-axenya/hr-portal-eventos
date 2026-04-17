import { useState } from "react";
import { UsePageHeaderFileProcessingSummaryProps } from "@/components";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { useBeneficiaryMovementFileErrorsQuery } from "@/queries/useBeneficiaryMovementFileErrorsQuery";
import { downloadMovimentationFailedRowsTemplate } from "@/services/ticketService";

export function usePageHeaderFileProcessingSummary({
  beneficiaryMovementFile,
}: UsePageHeaderFileProcessingSummaryProps) {
  const { openSnackbar } = useSnackbarContext();

  const {
    beneficiaryMovementFileErrors,
    fetchBeneficiaryMovementFileErrorsNextPage,
    hasBeneficiaryMovementFileErrorsNextPage,
    isBeneficiaryMovementFileErrorsFetchingNextPage,
    isBeneficiaryMovementFileErrorsLoading,
  } = useBeneficiaryMovementFileErrorsQuery(
    beneficiaryMovementFile.id,
    !!beneficiaryMovementFile.failedRows,
  );

  const successRowsLabel = `${beneficiaryMovementFile.successRows} Movimentações processadas`;
  const failedRowsLabel = `${beneficiaryMovementFile.failedRows} Erros encontrados`;

  const showErrors =
    beneficiaryMovementFile.failedRows > 0 &&
    beneficiaryMovementFileErrors.length > 0;

  const [isDownloading, setIsDownloading] = useState(false);

  const handleClickDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      await downloadMovimentationFailedRowsTemplate(beneficiaryMovementFile);
      openSnackbar({
        text: "Arquivo com erros baixado com sucesso!",
      });
    } catch {
      openSnackbar({
        text: "Erro ao baixar arquivo com erros.",
        type: "error",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    showErrors,
    successRowsLabel,
    failedRowsLabel,
    handleClickDownload,
    isDownloading,
    beneficiaryMovementFileErrors,
    fetchBeneficiaryMovementFileErrorsNextPage,
    hasBeneficiaryMovementFileErrorsNextPage,
    isBeneficiaryMovementFileErrorsFetchingNextPage,
    isBeneficiaryMovementFileErrorsLoading,
  };
}
