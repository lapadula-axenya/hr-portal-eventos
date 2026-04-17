import { useState } from "react";
import { LucideProps, MailIcon, TrashIcon } from "lucide-react";
import { ActionMenuItem, useActionMenu } from "@/components";
import { PrincipalStatus, PrincipalType } from "@/services/principalService";
import { theme } from "@/theme";
import { AdminUsersActionsProps } from "./AdminUsersActions.props";
import { useResendEmail } from "./hooks/useResendEmail";

const iconStyle: LucideProps = {
  color: theme.palette.primary.main,
  size: 24,
};

export function useAdminUsersActions(props: AdminUsersActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { resendEmail } = useResendEmail();

  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
  const closeOpenRemoveModal = () => setIsOpenRemoveModal(false);

  const { anchorEl, handleClick, handleClose, open } = useActionMenu();

  const isPending =
    props?.principal?.status === PrincipalStatus.PENDING_REGISTRATION;
  const isKam = props?.principal?.type === PrincipalType.KAM;

  const email = props?.principal?.channel?.[0]?.email;

  const menuItems: ActionMenuItem[] = [];

  if (isPending && email) {
    menuItems.push({
      id: "resend-invitation",
      label: "Reenviar convite",
      icon: MailIcon,
      iconStyle,
      disabled: isLoading,
      action: async () =>
        resendEmail({
          email,
          isLoading,
          onChangeIsLoading: setIsLoading,
          onHandleClose: handleClose,
        }),
    });
  }

  if (!isKam) {
    menuItems.push({
      id: "remove-user",
      label: "Remover usuário",
      icon: TrashIcon,
      iconStyle,
      disabled: isLoading,
      action: () => {
        setIsOpenRemoveModal(true);
        handleClose();
      },
    });
  }

  return {
    anchorEl,
    handleClick,
    handleClose,
    isOpenRemoveModal,
    closeOpenRemoveModal,
    menuItems,
    open,
  };
}
