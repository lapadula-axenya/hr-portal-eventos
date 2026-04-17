import { AuthRole } from "@/enums/AuthRole";

export type UpdateUserRolePayload = {
  id: string;
  role: AuthRole;
};

export type DeactivateUserPayload = {
  id: string | null;
};
