import { Button, Stack, Typography } from "@mui/material";
import { BaseModal, LoadingContainer } from "@/components";
import { usePrincipalParamsContext } from "@/contexts/PrincipalParamsContext";
import { usePrincipalDashboardsQuery } from "@/queries/usePrincipalDashboardsQuery";
import { AdminUsersAddDashboardProps } from ".";
import { AdminUsersAddDashboardModal } from "../AdminUsersAddDashboardModal";

export function AdminUsersAddDashboard({
  principal,
}: AdminUsersAddDashboardProps) {
  const { modalPrincipalId, setModalPrincipalId } = usePrincipalParamsContext();

  const { isPrincipalDashboardsLoading, principalDashboards } =
    usePrincipalDashboardsQuery(modalPrincipalId);

  const isEmpty = !principalDashboards.length;

  const isOpenModal = modalPrincipalId === principal.id;

  const handleOpen = () => setModalPrincipalId(principal.id);
  const handleClose = () => setModalPrincipalId("");

  return (
    <Stack alignItems="center">
      <Button variant="text" onClick={handleOpen}>
        Editar acesso
      </Button>

      <BaseModal
        open={isOpenModal}
        title="Dashboards do usuário"
        subtitle="Selecione os dashboards que este usuário terá acesso."
        onClose={handleClose}
      >
        {isPrincipalDashboardsLoading && <LoadingContainer />}

        {!isPrincipalDashboardsLoading && !isEmpty && (
          <AdminUsersAddDashboardModal
            principal={principal}
            principalDashboards={principalDashboards}
            onClose={handleClose}
          />
        )}

        {!isPrincipalDashboardsLoading && isEmpty && (
          <Typography textAlign="center">Dados não encontrados</Typography>
        )}
      </BaseModal>
    </Stack>
  );
}
