import { IconButton } from "@mui/material";
import { EllipsisIcon } from "lucide-react";
import { ActionMenu } from "@/components";
import { AdminUsersActionsProps } from ".";
import { useAdminUsersActions } from "./AdminUsersActions.hook";
import { AdminUsersRemoveModal } from "../AdminUsersRemoveModal";

export function AdminUsersActions(props: AdminUsersActionsProps) {
  const {
    anchorEl,
    closeOpenRemoveModal,
    handleClick,
    handleClose,
    isOpenRemoveModal,
    menuItems,
    open,
  } = useAdminUsersActions(props);

  return (
    <>
      <IconButton onClick={handleClick}>
        <EllipsisIcon />
      </IconButton>

      <ActionMenu
        open={open}
        anchorEl={anchorEl}
        menuItems={menuItems}
        onClose={handleClose}
      />

      {isOpenRemoveModal && props.principal && (
        <AdminUsersRemoveModal
          open={isOpenRemoveModal}
          principal={props.principal}
          onClose={closeOpenRemoveModal}
        />
      )}
    </>
  );
}
