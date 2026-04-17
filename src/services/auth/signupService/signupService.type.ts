import { AuthRole } from "@/enums/AuthRole";

export type SignupData = {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  roles: AuthRole[];
};
