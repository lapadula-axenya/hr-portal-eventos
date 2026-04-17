import { AuthRole } from "@/enums/AuthRole";

export type ValidateAccessKeyParams = {
  token: string;
  endpoint: string;
};

export type ValidateAccessKeyReturn = {
  email: string;
  roles?: AuthRole[];
};
