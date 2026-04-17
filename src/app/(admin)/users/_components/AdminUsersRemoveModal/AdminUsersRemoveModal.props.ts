import { Principal } from "@/services/principalService";

export type AdminUsersRemoveModalProps = {
  principal: Principal;
  open: boolean;
  onClose: () => void;
};
