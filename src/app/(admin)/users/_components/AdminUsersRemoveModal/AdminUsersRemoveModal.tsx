import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import { TriangleAlertIcon } from "lucide-react";
import { ActionButtons, BaseModal } from "@/components";
import { theme } from "@/theme";
import { getPrincipalEmail } from "@/utils/getPrincipalEmail";
import { AdminUsersRemoveModalProps, useAdminUsersRemoveModal } from ".";

export function AdminUsersRemoveModal(props: AdminUsersRemoveModalProps) {
  const {
    handleClose,
    handleSubmit,
    isLastAdmin,
    isLoading,
    isLoadingLastAdmin,
    primaryButtonLabel,
    title,
    type,
  } = useAdminUsersRemoveModal(props);

  if (isLoadingLastAdmin) {
    return (
      <Backdrop open sx={{ zIndex: 10 }}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <BaseModal
      title={title}
      open={props.open}
      onClose={handleClose}
      type={type}
      small
    >
      {isLastAdmin && (
        <Stack direction="row" marginBottom={1.5}>
          <Stack>
            <Typography variant="body2" fontWeight={600}>
              Você é o último administrador desta empresa
            </Typography>
            <Typography variant="body2" marginBottom={2}>
              Ao excluir esta conta, ninguém terá acesso para gerenciar
              permissões ou adicionar novos usuários.
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              Tem certeza de que deseja continuar?
            </Typography>
          </Stack>

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
        </Stack>
      )}

      {!isLastAdmin && (
        <Typography variant="body2" color="grey.300" marginBottom={1.5}>
          O usuário {getPrincipalEmail(props?.principal)} será removido do
          sistema e não poderá mais acessar a plataforma. Para restaurar o
          acesso, será necessário criar um novo convite.
        </Typography>
      )}

      <ActionButtons
        type={type}
        loading={isLoading}
        primaryButtonLabel={primaryButtonLabel}
        onClickPrimaryButton={handleSubmit}
        onClickSecondaryButton={handleClose}
      />
    </BaseModal>
  );
}
