import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ActionMenuItem, useActionMenu } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { QueryKey } from "@/enums/QueryKey";
import { logout } from "@/services/auth/loginService/loginService";
import { getMyPrincipal } from "@/services/principalService";

export function usePageHeader() {
  const { authQueryKey, isAdmin } = useAuthContext();
  const { companies, selectedCompanyId, setSelectedCompany } =
    useCompanyContext();

  const { anchorEl, handleClick, handleClose, open } = useActionMenu();

  const [isOpenUserDetailsModal, setIsOpenUserDetailsModal] = useState(false);

  const principalQuery = useQuery({
    queryKey: [QueryKey.PRINCIPAL_ME, ...authQueryKey],
    queryFn: getMyPrincipal,
  });

  const principal = principalQuery.data;
  const isLoadingPrincipal = principalQuery.isLoading;

  const router = useRouter();

  const handleAction = (callback: () => void) => {
    handleClose();
    callback();
  };

  const menuItems: ActionMenuItem[] = [];

  menuItems.push({
    id: "my-data",
    label: "Meus dados",
    action: () => handleAction(() => setIsOpenUserDetailsModal(true)),
  });

  if (isAdmin) {
    menuItems.push({
      id: "manage-users",
      label: "Gerenciar usuários",
      action: () => handleAction(() => router.push(AppRoutes.ADMIN.USERS)),
    });
  }

  menuItems.push({
    id: "logout",
    label: "Sair",
    divider: true,
    action: logout,
  });

  return {
    anchorEl,
    companies,
    handleClick,
    handleClose,
    isLoadingPrincipal,
    isOpenUserDetailsModal,
    menuItems,
    open,
    principal,
    selectedCompanyId,
    setIsOpenUserDetailsModal,
    setSelectedCompany,
  };
}
