import { PropsWithChildren } from "react";
import { AuthRole } from "@/enums/AuthRole";

export type ProtectedLayoutProps = PropsWithChildren<{
  allowedRoles: AuthRole[];
  fallbackRoute?: string;
}>;
