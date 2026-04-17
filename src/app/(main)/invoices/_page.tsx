"use client";

import { Checkbox, Stack, Typography } from "@mui/material";
import { plural } from "@umatch/pluralize-ptbr";
import {
  ActionSnackbar,
  BenefitTypeIcon,
  PageContainer,
  PageTable,
  PageTableDualTextCell,
  PageTableSingleTextCell,
} from "@/components";
import { useInvoiceParamsContext } from "@/contexts/InvoiceParamsContext";
import { useSelectedIds } from "@/hooks/useSelectedIds";
import { useInvoicesQuery } from "@/queries/useInvoicesQuery";
import { formatDate } from "@/utils/formatDate";
import { formatMoney } from "@/utils/formatMoney";
import { maskCnpj } from "@/utils/maskCnpj";
import { smartNameCase } from "@/utils/smartNameCase";
import { MainInvoicesDownloadButton } from "./_components/MainInvoicesDownloadButton";
import { MainInvoicesHeaderSlot } from "./_components/MainInvoicesHeaderSlot";

export default function MainInvoicesPage() {
  const { changePage, page } = useInvoiceParamsContext();

  const { invoices, invoicesMeta, isInvoicesEmpty, isInvoicesLoading } =
    useInvoicesQuery();

  const {
    checkSelectedId,
    clearSelectedIds,
    hasSelectedIds,
    isAllSelectedIds,
    selectedIds,
    selectedIdsCount,
    toggleAllSelectedIds,
    toggleSelectedId,
  } = useSelectedIds(invoices.length);

  const textSnackbar = `${selectedIdsCount} ${plural("arquivo", selectedIdsCount)} ${plural("selecionado", selectedIdsCount)}`;

  const handleDownloadFile = (invoiceId?: string) => {
    // TODO: Back-end integration
    console.log(invoiceId);
  };

  const handleDownloadSelectedFile = () => {
    // TODO: Back-end integration
    console.log(selectedIds);
  };

  return (
    <PageContainer title="Faturas" headerSlot={<MainInvoicesHeaderSlot />}>
      <ActionSnackbar
        open={hasSelectedIds}
        message={hasSelectedIds ? textSnackbar : ""}
        action={
          <Stack direction="row" spacing="10px" alignItems="center">
            <Typography variant="body2">Baixar</Typography>
            <MainInvoicesDownloadButton onClick={handleDownloadSelectedFile} />
          </Stack>
        }
      />

      <PageTable
        items={invoices}
        isLoading={isInvoicesLoading}
        isEmpty={isInvoicesEmpty}
        textEmptyState="Nenhuma fatura encontrada."
        pagination={{ page, changePage }}
        meta={invoicesMeta}
        onChangePage={clearSelectedIds}
        renderRow={(invoice) => [
          {
            width: "75px",
            title: "checkbox",
            titleElement: (
              <Checkbox
                checked={isAllSelectedIds}
                onChange={() => toggleAllSelectedIds(invoices)}
              />
            ),
            content: (
              <Checkbox
                checked={checkSelectedId(invoice?.id)}
                onChange={() => toggleSelectedId(invoice?.id)}
              />
            ),
          },
          {
            title: "Nome do Arquivo",
            content: (
              <PageTableSingleTextCell
                variant="caption"
                color="white"
                text={invoice?.fileName}
              />
            ),
          },
          {
            title: "CNPJ",
            content: (
              <PageTableDualTextCell
                primaryText={smartNameCase(invoice?.company?.name)}
                secondaryText={maskCnpj(invoice?.company?.document)}
              />
            ),
          },
          {
            title: "Operadora",
            titleAlign: "center",
            content: (
              <PageTableSingleTextCell
                text={invoice?.provider?.name}
                textAlign="center"
              />
            ),
          },
          {
            title: "Benefício",
            titleAlign: "center",
            content: (
              <Stack alignItems="center">
                {invoice?.benefit?.type && (
                  <BenefitTypeIcon
                    type={invoice?.benefit?.type}
                    strokeWidth={2.25}
                  />
                )}
              </Stack>
            ),
          },
          {
            title: "Competência",
            titleAlign: "center",
            content: (
              <PageTableSingleTextCell
                text={invoice?.coveragePeriod}
                textAlign="center"
              />
            ),
          },
          {
            title: "Vencimento",
            content: (
              <PageTableSingleTextCell text={formatDate(invoice?.dueDate)} />
            ),
          },
          {
            title: "Valor",
            titleAlign: "center",
            content: (
              <PageTableSingleTextCell
                text={formatMoney(invoice?.amount)}
                textAlign="end"
              />
            ),
          },
          {
            title: "download",
            hideTitle: true,
            width: "75px",
            content: (
              <Stack alignItems="center">
                <MainInvoicesDownloadButton
                  onClick={() => handleDownloadFile(invoice?.id)}
                />
              </Stack>
            ),
          },
        ]}
      />
    </PageContainer>
  );
}
