export enum AuthRole {
  USER = "user",
  ADMIN = "admin",
}

export const AuthRoleLabel: Record<AuthRole, string> = {
  [AuthRole.USER]: "User - Acesso a plataforma",
  [AuthRole.ADMIN]: "Admin - Acesso a plataforma + permissões",
};
