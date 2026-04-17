import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { QueryKey } from "@/enums/QueryKey";
import { StyleVariant } from "@/enums/StyleVariant";
import { logout } from "@/services/auth/loginService/loginService";
import { checkIfIsLastAdminPrincipal } from "@/services/principalService";
import { getPrincipalEmail } from "@/utils/getPrincipalEmail";
import { isCurrentUserPrincipal } from "@/utils/isCurrentUserPrincipal";
import { AdminUsersRemoveModalProps } from ".";
import { safelyDeactivateUser } from "./hooks/useSafelyDeactivateUser";

export function useAdminUsersRemoveModal(props: AdminUsersRemoveModalProps) {
  const queryClient = useQueryClient();

  const { openSnackbar } = useSnackbarContext();
  const { isLastAdmin, setIsLastAdmin } = useAuthContext();

  const isCurrentUser = isCurrentUserPrincipal(props.principal);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLastAdmin, setIsLoadingLastAdmin] = useState(false);

  useEffect(() => {
    if (isCurrentUser && isLastAdmin === undefined) {
      const checkLastAdmin = async () => {
        setIsLoadingLastAdmin(true);
        try {
          const data = await checkIfIsLastAdminPrincipal(props.principal.id);
          setIsLastAdmin(data.isLastAdmin);
        } catch {
          openSnackbar({
            title: "Erro ao verificar se é o último admin",
            text: "Não foi possível verificar se é o último admin.",
            type: "error",
          });
        } finally {
          setIsLoadingLastAdmin(false);
        }
      };

      checkLastAdmin();
    }
  }, [
    isCurrentUser,
    isLastAdmin,
    props.principal.id,
    setIsLastAdmin,
    openSnackbar,
  ]);

  const title = isLastAdmin
    ? "Atenção: A empresa ficará sem administrador"
    : "Remover usuário";

  const primaryButtonLabel = isLastAdmin
    ? "Remover Administrador"
    : "Remover usuário";

  const type = isLastAdmin ? StyleVariant.DANGER : StyleVariant.DEFAULT;

  const handleClose = () => {
    if (isLoading) return;
    props.onClose();
  };

  const handleSubmit = async () => {
    if (isLoading || isLoadingLastAdmin) return;

    setIsLoading(true);

    try {
      await safelyDeactivateUser(props.principal);

      const isCurrentUser = isCurrentUserPrincipal(props.principal);

      if (isCurrentUser) {
        await logout();
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: [QueryKey.PRINCIPALS],
      });

      openSnackbar({
        title: "Usuário removido",
        text: `${getPrincipalEmail(props.principal)} foi removido da plataforma.`,
      });

      props.onClose();
    } catch {
      openSnackbar({
        title: "Erro ao remover o usuário",
        text: "Não foi possível remover o usuário. Tente novamente.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    title,
    isLastAdmin,
    isLoadingLastAdmin,
    primaryButtonLabel,
    type,
    handleClose,
    handleSubmit,
  };
}
