import { AuthRole } from "@/enums/AuthRole";

export enum PrincipalType {
  CUSTOMER = "CUSTOMER",
  KAM = "KAM",
}

export enum PrincipalStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING_REGISTRATION = "PENDING_REGISTRATION",
}

export enum PrincipalStatusTranslate {
  ACTIVE = "Ativo",
  INACTIVE = "Inativo",
  PENDING_REGISTRATION = "Aguardando cadastro",
}

export type Principal = {
  id: string;
  externalId: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  status: PrincipalStatus;
  type: PrincipalType;
  hasDashboardAccess: boolean;
  roles: { name: AuthRole }[];
  channel: { email: string }[];
  company: {
    id: string;
    name: string;
    companyId: string;
  };
};

export type PrincipalFilter = {
  searchTerm?: string;
};

export type UpdatePrincipalRolePayload = {
  rolesToAdd: AuthRole[];
  rolesToRemove: AuthRole[];
};

export type CheckIfIsLastAdminPrincipalReturn = {
  isLastAdmin: boolean;
};
