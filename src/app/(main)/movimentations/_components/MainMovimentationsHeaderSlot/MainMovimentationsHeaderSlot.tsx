import { Button, Stack, Typography } from "@mui/material";
import { FolderUpIcon, XIcon } from "lucide-react";
import { InputDebounce, InputSelectMultiple } from "@/components";
import { benefitActionTypeOptions } from "@/constants/benefitActionTypeOptions";
import { benefitMovimentationStatusOptions } from "@/constants/benefitMovimentationStatusOptions";
import { benefitTypeOptions } from "@/constants/benefitTypeOptions";
import { useTicketParamsContext } from "@/contexts/TicketParamsContext";
import { useChangeWithResetPage } from "@/hooks/useChangeWithResetPage";
import { useCompaniesQuery } from "@/queries/useCompaniesQuery";
import { useTicketsQuery } from "@/queries/useTicketsQuery";
import { mapCompanyOptions } from "@/utils/mapCompanyOptions";

export function MainMovimentationsHeaderSlot() {
  const {
    actionTypesFilter,
    benefitTypesFilter,
    changePage,
    clearFilter,
    hasFilter,
    isOpenUploadModal,
    movimentationStatusFilter,
    openUploadModal,
    setActionTypesFilter,
    setBenefitTypesFilter,
    setMovimentationStatusFilter,
    setSearch,
    setSubestipulantIdFilter,
    subestipulantIdFilter,
    ticketParams,
  } = useTicketParamsContext();

  const { isTicketsLoading } = useTicketsQuery({
    params: ticketParams,
  });

  const { handleChangeWithResetPage } = useChangeWithResetPage(changePage);

  const { companies, isCompaniesLoading } = useCompaniesQuery();

  const companyOptions = mapCompanyOptions(companies);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing="2rem"
      width="100%"
    >
      <Stack direction="row" spacing="1rem">
        <InputSelectMultiple
          placeholder="Tipos"
          value={actionTypesFilter}
          options={benefitActionTypeOptions}
          disabled={isTicketsLoading}
          onDebounce={handleChangeWithResetPage(setActionTypesFilter)}
          sx={{ width: "150px" }}
        />

        <InputSelectMultiple
          placeholder="Empresas"
          value={subestipulantIdFilter}
          options={companyOptions}
          disabled={isTicketsLoading || isCompaniesLoading}
          onDebounce={handleChangeWithResetPage(setSubestipulantIdFilter)}
          sx={{ width: 150 }}
        />

        <InputSelectMultiple
          placeholder="Beneficios"
          value={benefitTypesFilter}
          options={benefitTypeOptions}
          disabled={isTicketsLoading}
          onDebounce={handleChangeWithResetPage(setBenefitTypesFilter)}
          sx={{ width: "150px" }}
        />

        <InputSelectMultiple
          placeholder="Status"
          value={movimentationStatusFilter}
          options={benefitMovimentationStatusOptions}
          disabled={isTicketsLoading}
          onDebounce={handleChangeWithResetPage(setMovimentationStatusFilter)}
          sx={{ width: "150px" }}
        />

        {hasFilter && (
          <Button
            onClick={clearFilter}
            variant="text"
            disabled={isTicketsLoading}
            startIcon={<XIcon size={16} />}
          >
            <Typography variant="caption">Limpar filtros</Typography>
          </Button>
        )}
      </Stack>

      <Stack direction="row" spacing="1rem">
        <InputDebounce
          disabled={isTicketsLoading}
          onDebounce={handleChangeWithResetPage(setSearch)}
          placeholder="Buscar nome ou cpf"
          sx={{ width: 200 }}
        />

        <Button
          startIcon={<FolderUpIcon />}
          disabled={isOpenUploadModal}
          onClick={openUploadModal}
        >
          Enviar movimentações
        </Button>
      </Stack>
    </Stack>
  );
}
