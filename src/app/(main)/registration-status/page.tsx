"use client";

import { useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { XIcon } from "lucide-react";
import {
  InputDebounce,
  InputSelectMultiple,
  PageContainer,
  PageTable,
  PageTableDualTextCell,
  PageTableSingleTextCell,
} from "@/components";
import { beneficiaryTypeOptions } from "@/constants/beneficiaryTypeOption";
import { benefitTypeOptions } from "@/constants/benefitTypeOptions";
import { useBeneficiaryParamsContext } from "@/contexts/BeneficiaryParamsContext";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { useChangeWithResetPage } from "@/hooks/useChangeWithResetPage";
import { useBeneficiariesQuery } from "@/queries/useBeneficiariesQuery";
import { useCompaniesQuery } from "@/queries/useCompaniesQuery";
import {
  BeneficiarySummary,
  BeneficiaryTypeTranslate,
} from "@/services/beneficiaryService";
import { getSearchResultMessage } from "@/utils/getSearchResultMessage";
import { mapBeneficiaryApiToSummary } from "@/utils/mapBeneficiaryApiToSummary";
import { mapCompanyOptions } from "@/utils/mapCompanyOptions";
import { maskCnpj } from "@/utils/maskCnpj";
import { maskCpf } from "@/utils/maskCpf";
import { smartNameCase } from "@/utils/smartNameCase";
import {
  MainRegistrationStatusBenefits,
  MainRegistrationStatusModal,
} from "./_components";

export default function MainRegistrationStatusPage() {
  const { openSnackbar } = useSnackbarContext();

  const {
    beneficiaryParams,
    changePage,
    clearFilter,
    hasFilter,
    modalBeneficiaryId,
    page,
    search,
    selectedBeneficiaryTypes,
    selectedBenefitTypes,
    selectedSubestipulantIdFilter,
    setModalBeneficiaryId,
    setModalBenefitId,
    setSearch,
    setSelectedBeneficiaryTypes,
    setSelectedBenefitTypes,
    setSelectedSubestipulantIdFilter,
  } = useBeneficiaryParamsContext();

  const {
    beneficiaries,
    beneficiariesMeta,
    isBeneficiariesEmpty,
    isBeneficiariesLoading,
  } = useBeneficiariesQuery({
    params: beneficiaryParams,
  });

  const mappedBeneficiaries = useMemo(
    () => beneficiaries.map(mapBeneficiaryApiToSummary),
    [beneficiaries],
  );

  const { handleChangeWithResetPage } = useChangeWithResetPage(changePage);

  const { companies, isCompaniesLoading } = useCompaniesQuery();

  const companyOptions = mapCompanyOptions(companies);

  const searchResultMessage = getSearchResultMessage(
    beneficiariesMeta?.totalItems,
    "beneficiário",
  );

  const handleClickBeneficiary = (beneficiary?: BeneficiarySummary) => {
    if (!beneficiary?.id) {
      openSnackbar({
        title: "Erro ao abrir detalhes do beneficiário",
        text: "Não foi possível abrir os detalhes do beneficiário. Tente novamente.",
        type: "error",
      });
      return;
    }

    setModalBeneficiaryId(beneficiary?.id);
  };

  const handleClickBenefit = (beneficiaryId: string, benefitId?: string) => {
    if (!beneficiaryId || !benefitId) {
      openSnackbar({
        title: "Erro ao abrir detalhes do beneficiário",
        text: "Não foi possível abrir os detalhes do beneficiário. Tente novamente.",
        type: "error",
      });
      return;
    }

    setModalBeneficiaryId(beneficiaryId);
    setModalBenefitId(benefitId);
  };

  return (
    <PageContainer
      title="Posição Cadastral"
      headerSlot={
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing="2rem"
          width="100%"
        >
          <Stack direction="row" spacing="1rem">
            <InputSelectMultiple
              placeholder="Tipos"
              singleSelect
              value={selectedBeneficiaryTypes}
              options={beneficiaryTypeOptions}
              disabled={isBeneficiariesLoading}
              onDebounce={handleChangeWithResetPage(
                setSelectedBeneficiaryTypes,
              )}
              sx={{ width: 150 }}
            />
            <InputSelectMultiple
              placeholder="Empresas"
              value={selectedSubestipulantIdFilter}
              options={companyOptions}
              disabled={isBeneficiariesLoading || isCompaniesLoading}
              onDebounce={handleChangeWithResetPage(
                setSelectedSubestipulantIdFilter,
              )}
              sx={{ width: 150 }}
            />
            <InputSelectMultiple
              placeholder="Beneficios"
              value={selectedBenefitTypes}
              options={benefitTypeOptions}
              disabled={isBeneficiariesLoading}
              onDebounce={handleChangeWithResetPage(setSelectedBenefitTypes)}
              sx={{ width: 150 }}
            />
            {hasFilter && (
              <Button
                onClick={clearFilter}
                variant="text"
                disabled={isBeneficiariesLoading}
                startIcon={<XIcon size={16} />}
              >
                <Typography variant="caption">Limpar filtros</Typography>
              </Button>
            )}
          </Stack>

          <InputDebounce
            disabled={isBeneficiariesLoading}
            onDebounce={handleChangeWithResetPage(setSearch)}
            placeholder="Buscar nome, cpf ou matrícula..."
            sx={{ width: 280 }}
          />
        </Stack>
      }
    >
      <MainRegistrationStatusModal />

      <PageTable
        items={mappedBeneficiaries}
        isLoading={isBeneficiariesLoading}
        isEmpty={isBeneficiariesEmpty}
        textEmptyState="Nenhum beneficiário encontrado."
        hasSearch={!!search}
        searchResultMessage={searchResultMessage}
        pagination={{ page, changePage }}
        meta={beneficiariesMeta}
        onClickRow={handleClickBeneficiary}
        selectedRowId={modalBeneficiaryId}
        renderRow={(beneficiary) => [
          {
            title: "Beneficiário",
            width: "30%",
            content: (
              <Box maxWidth="300px">
                <PageTableDualTextCell
                  primaryText={smartNameCase(beneficiary?.name)}
                  secondaryText={
                    beneficiary?.enrollmentNumber
                      ? `Matrícula: ${beneficiary.enrollmentNumber}`
                      : ""
                  }
                />
              </Box>
            ),
          },
          {
            title: "CPF",
            width: "15%",
            content: (
              <PageTableSingleTextCell text={maskCpf(beneficiary?.document)} />
            ),
          },
          {
            title: "Tipo",
            width: "15%",
            content: (
              <PageTableSingleTextCell
                text={
                  beneficiary?.type
                    ? BeneficiaryTypeTranslate[beneficiary.type]
                    : "-"
                }
              />
            ),
          },
          {
            title: "CNPJ",
            width: "20%",
            content: (
              <PageTableDualTextCell
                primaryText={smartNameCase(beneficiary?.company?.name)}
                secondaryText={maskCnpj(beneficiary?.company?.document)}
              />
            ),
          },
          {
            title: "Benefícios",
            width: "20%",
            content: (
              <MainRegistrationStatusBenefits
                beneficiary={beneficiary}
                onClick={handleClickBenefit}
              />
            ),
          },
        ]}
      />
    </PageContainer>
  );
}
