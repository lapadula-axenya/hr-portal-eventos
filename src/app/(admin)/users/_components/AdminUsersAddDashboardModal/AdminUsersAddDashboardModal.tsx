import { useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { plural } from "@umatch/pluralize-ptbr";
import { ActionButtons, CheckboxList, SelectOption } from "@/components";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { QueryKey } from "@/enums/QueryKey";
import { putPrincipalDashboards } from "@/services/dashboardService";
import { haveSameElements } from "@/utils/haveSameElements";
import { isCurrentUserPrincipal } from "@/utils/isCurrentUserPrincipal";
import { AdminUsersAddDashboardModalProps } from "./AdminUsersAddDashboardModal.props";

export function AdminUsersAddDashboardModal({
  onClose,
  principal,
  principalDashboards,
}: AdminUsersAddDashboardModalProps) {
  const isCurrentUser = isCurrentUserPrincipal(principal);

  const queryClient = useQueryClient();

  const { openSnackbar } = useSnackbarContext();

  const [isLoading, setIsLoading] = useState(false);

  const { dashboardOptions, initialSelectedDashboardIds } = useMemo(
    () =>
      principalDashboards.reduce(
        (acc, d) => {
          if (d.hasAccess) {
            acc.initialSelectedDashboardIds.push(d.id);
          }
          acc.dashboardOptions.push({
            value: d.id,
            label: d.name,
          });
          return acc;
        },
        {
          initialSelectedDashboardIds: [] as string[],
          dashboardOptions: [] as SelectOption[],
        },
      ),
    [principalDashboards],
  );

  const [selectedDashboardIds, setSelectedDashboardIds] = useState<string[]>(
    initialSelectedDashboardIds,
  );

  const sameDashboards = haveSameElements(
    initialSelectedDashboardIds,
    selectedDashboardIds,
  );

  const amountDashboards = dashboardOptions.length;
  const amountSelectDashboards = selectedDashboardIds.length;

  const name = principal.fullName ? `${principal.fullName} - ` : "";
  const email = principal.channel[0]?.email ?? "";
  const principalLabel = `${name}${email}`;

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    if (sameDashboards) {
      onClose();
      return;
    }

    setIsLoading(true);

    try {
      await putPrincipalDashboards(principal.id, selectedDashboardIds);

      await queryClient.invalidateQueries({
        queryKey: [QueryKey.PRINCIPAL_DASHBOARDS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.PRINCIPALS],
      });

      if (isCurrentUser) {
        await queryClient.invalidateQueries({
          queryKey: [QueryKey.DASHBOARD],
        });
        await queryClient.invalidateQueries({
          queryKey: [QueryKey.DASHBOARDS],
        });
      }

      onClose();
    } catch {
      openSnackbar({
        title: "Erro ao atualizar dashboards",
        text: `Não foi possível atualizar dashboards para o usuário ${principalLabel}. Tente novamente.`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        color="grey.300"
        mb="16px"
      >
        <Typography variant="caption">{principalLabel}</Typography>

        <Typography variant="caption">
          {amountSelectDashboards} de {amountDashboards}{" "}
          {plural("dashboard", amountDashboards)}
        </Typography>
      </Stack>

      <Stack spacing="16px">
        <CheckboxList
          options={dashboardOptions}
          disabled={isLoading}
          selecteds={selectedDashboardIds}
          onChange={setSelectedDashboardIds}
        />

        <ActionButtons
          loading={isLoading}
          primaryButtonLabel="Adicionar"
          onClickSecondaryButton={handleClose}
          onClickPrimaryButton={handleSubmit}
        />
      </Stack>
    </Stack>
  );
}
