import { PrincipalDashboard } from "@/services/dashboardService";
import { Principal } from "@/services/principalService";

export type AdminUsersAddDashboardModalProps = {
  principal: Principal;
  principalDashboards: PrincipalDashboard[];
  onClose: () => void;
};
