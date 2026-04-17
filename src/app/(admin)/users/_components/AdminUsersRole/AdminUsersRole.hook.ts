import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SelectOption } from "@/components";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { AuthRole } from "@/enums/AuthRole";
import { QueryKey } from "@/enums/QueryKey";
import { checkIfIsLastAdminPrincipal } from "@/services/principalService";
import { isCurrentUserPrincipal } from "@/utils/isCurrentUserPrincipal";
import { AdminUsersRoleProps } from "./AdminUsersRole.props";
import { safelyUpdateUserRole } from "./utils/safelyUpdateUserRole";

const roleOptions: SelectOption[] = [
  { label: "User", value: AuthRole.USER },
  { label: "Admin", value: AuthRole.ADMIN },
];

export function useAdminUsersRole(props: AdminUsersRoleProps) {
  const queryClient = useQueryClient();

  const { isLastAdmin, refreshUserData, setIsLastAdmin } = useAuthContext();
  const { openSnackbar } = useSnackbarContext();

  const isCurrentUser = isCurrentUserPrincipal(props.principal);

  const isLastAdminEmpty = isCurrentUser && isLastAdmin === undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLastAdmin, setIsLoadingLastAdmin] = useState(false);
  const [newRoleInModal, setNewRoleInModal] = useState<AuthRole | null>(null);

  const currentRole = props.principal.roles[0].name;

  const handleCloseModal = () => {
    if (isLoading) return;
    setNewRoleInModal(null);
  };

  const handleUpdateRoles = async (newRole: AuthRole, confirmed?: boolean) => {
    if (!confirmed && isCurrentUser) {
      setNewRoleInModal(newRole);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isLastAdminEmpty) {
        setIsLoadingLastAdmin(true);
        const data = await checkIfIsLastAdminPrincipal(props.principal.id);
        setIsLastAdmin(data.isLastAdmin);
        setIsLoadingLastAdmin(false);
        if (data.isLastAdmin) {
          setNewRoleInModal(newRole);
          return;
        }
      }

      await safelyUpdateUserRole({
        principalId: props.principal.id,
        externalId: props.principal.externalId,
        currentRole,
        newRole,
      });

      await queryClient.invalidateQueries({
        queryKey: [QueryKey.PRINCIPALS],
      });

      if (isCurrentUser) {
        await refreshUserData();
      }

      openSnackbar({
        title: "Tipo de acesso atualizado",
        text: `${props.principal.channel?.[0]?.email} teve seu acesso alterado para ${newRole} da empresa.`,
      });
    } catch {
      openSnackbar({
        title: "Erro ao atualizar tipo de acesso",
        text: "Não foi possível atualizar o tipo de acesso. Tente novamente.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdateRoles,
    newRoleInModal,
    isLoadingLastAdmin,
    handleCloseModal,
    currentRole,
    roleOptions,
    isLoading,
    isLastAdmin,
  };
}
