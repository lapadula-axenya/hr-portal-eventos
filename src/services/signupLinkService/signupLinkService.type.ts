import { AuthRole } from "@/enums/AuthRole";

export type SignupLinkPayload = {
  email: string;
  roles: AuthRole[];
};

export type SignupLinkResendPayload = {
  email: string;
};
