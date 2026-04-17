import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { TriangleAlertIcon } from "lucide-react";
import { ActionButtons, BaseModal, InputSelect } from "@/components";
import { AuthRole } from "@/enums/AuthRole";
import { StyleVariant } from "@/enums/StyleVariant";
import { theme } from "@/theme";
import { useAdminUsersRole } from ".";
import { AdminUsersRoleProps } from ".";

export function AdminUsersRole(props: AdminUsersRoleProps) {
  const {
    currentRole,
    handleCloseModal,
    handleUpdateRoles,
    isLastAdmin,
    isLoading,
    isLoadingLastAdmin,
    newRoleInModal,
    roleOptions,
  } = useAdminUsersRole(props);

  const modalType = isLastAdmin ? StyleVariant.DANGER : StyleVariant.DEFAULT;

  const modalTitle = isLastAdmin
    ? "Atenção: A empresa ficará sem administrador"
    : "Atenção";

  const handleSubmit = async () => {
    if (!newRoleInModal) return;
    await handleUpdateRoles(newRoleInModal, true);
    handleCloseModal();
  };

  return (
    <>
      <Box width={120}>
        <InputSelect
          options={roleOptions}
          value={currentRole}
          onChangeValue={(value) => handleUpdateRoles(value as AuthRole)}
          disabled={isLoading}
          noBorder
        />
      </Box>

      {isLoadingLastAdmin && (
        <Backdrop open sx={{ zIndex: 10 }}>
          <CircularProgress />
        </Backdrop>
      )}

      {!!newRoleInModal && (
        <BaseModal
          title={modalTitle}
          open={!!newRoleInModal}
          onClose={handleCloseModal}
          type={modalType}
        >
          <Stack direction="row" marginBottom={1.5} spacing="1rem">
            <Stack>
              {isLastAdmin && (
                <>
                  <Typography variant="body2" fontWeight={600}>
                    Você é o último administrador desta empresa.
                  </Typography>
                  <Typography variant="body2" marginBottom={2}>
                    Se você mudar seu tipo de acesso para &quot;User&quot;,
                    ninguém mais poderá gerenciar permissões ou adicionar novos
                    usuários.
                  </Typography>
                </>
              )}
              {!isLastAdmin && (
                <Typography variant="body2" marginBottom={2}>
                  Ao mudar seu tipo de acesso para &quot;User&quot;, você não
                  poderá mais acessar a área administrativa.
                </Typography>
              )}

              <Typography variant="body2" marginBottom={2}>
                Por questões técnicas, será necessário fazer login novamente
                para que suas novas permissões sejam aplicadas.
              </Typography>

              <Typography variant="body1" fontWeight={600}>
                Tem certeza de que deseja continuar?
              </Typography>
            </Stack>

            {isLastAdmin && (
              <Stack
                height={111}
                width={111}
                minHeight={111}
                minWidth={111}
                alignItems="center"
                justifyContent="center"
                borderRadius="11px"
                bgcolor="error.dark"
              >
                <TriangleAlertIcon
                  size={79}
                  color={theme.palette.error.main}
                  strokeWidth={1}
                />
              </Stack>
            )}
          </Stack>

          <ActionButtons
            type={modalType}
            loading={isLoading}
            primaryButtonLabel="Alterar acesso"
            onClickPrimaryButton={handleSubmit}
            onClickSecondaryButton={handleCloseModal}
          />
        </BaseModal>
      )}
    </>
  );
}
