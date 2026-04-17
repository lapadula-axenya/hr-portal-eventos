import { AuthRoleLabel } from "@/enums/AuthRole";
import { Principal } from "@/services/principalService";

export function getPrincipalRoleLabel(principal: Principal) {
  return principal.roles.map(({ name }) => AuthRoleLabel[name]).join(", ");
}
