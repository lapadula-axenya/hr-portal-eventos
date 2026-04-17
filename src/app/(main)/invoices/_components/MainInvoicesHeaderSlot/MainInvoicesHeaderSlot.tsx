import { Button, Stack, Typography } from "@mui/material";
import { XIcon } from "lucide-react";
import {
  InputDateRangePicker,
  InputDebounce,
  InputSelectMultiple,
  SelectOption,
} from "@/components";
import { benefitTypeOptions } from "@/constants/benefitTypeOptions";
import { useInvoiceParamsContext } from "@/contexts/InvoiceParamsContext";
import { useCompaniesQuery } from "@/queries/useCompaniesQuery";
import { useInvoicesQuery } from "@/queries/useInvoicesQuery";
import { useProvidersQuery } from "@/queries/useProvidersQuery";
import { maskCnpj } from "@/utils/maskCnpj";

export function MainInvoicesHeaderSlot() {
  const {
    benefitTypesFilter,
    clearFilter,
    companyIdsFilter,
    endDate,
    hasFilter,
    invoiceParams,
    providerIdsFilter,
    setBenefitTypesFilter,
    setCompanyIdsFilter,
    setEndDate,
    setProviderIdsFilter,
    setSearch,
    setStartDate,
    startDate,
  } = useInvoiceParamsContext();

  const { isInvoicesLoading } = useInvoicesQuery({
    params: invoiceParams,
  });

  const { companies, isCompaniesLoading } = useCompaniesQuery();
  const { isProvidersLoading, providers } = useProvidersQuery();

  const companyOptions: SelectOption[] = companies.map((item) => ({
    value: item.document,
    label: item.name,
    subtitle: maskCnpj(item.document),
  }));

  const providerOptions: SelectOption[] = providers.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing="2rem"
      width="100%"
    >
      <Stack direction="row" spacing="1rem">
        <InputSelectMultiple
          placeholder="Empresa"
          value={companyIdsFilter}
          options={companyOptions}
          disabled={isInvoicesLoading || isCompaniesLoading}
          onDebounce={setCompanyIdsFilter}
          sx={{ width: 150 }}
        />

        <InputSelectMultiple
          placeholder="Operadora"
          value={providerIdsFilter}
          options={providerOptions}
          disabled={isInvoicesLoading || isProvidersLoading}
          onDebounce={setProviderIdsFilter}
          sx={{ width: 150 }}
        />

        <InputSelectMultiple
          placeholder="Beneficios"
          value={benefitTypesFilter}
          options={benefitTypeOptions}
          disabled={isInvoicesLoading}
          onDebounce={setBenefitTypesFilter}
          sx={{ width: 150 }}
        />

        <InputDateRangePicker
          startDate={startDate}
          endDate={endDate}
          disabled={isInvoicesLoading}
          onChangeStartDate={setStartDate}
          onChangeEndDate={setEndDate}
          sx={{ width: 280 }}
        />

        {hasFilter && (
          <Button
            onClick={clearFilter}
            variant="text"
            disabled={isInvoicesLoading}
            startIcon={<XIcon size={16} />}
          >
            <Typography variant="caption">Limpar filtros</Typography>
          </Button>
        )}
      </Stack>

      <InputDebounce
        disabled={isInvoicesLoading}
        onDebounce={setSearch}
        placeholder="Buscar nome do arquivo..."
        sx={{ width: 300 }}
      />
    </Stack>
  );
}
