import { PropsWithChildren, ReactNode } from "react";
import { AuthRole } from "@/enums/AuthRole";

export type ProtectedProps = PropsWithChildren<{
  roles: AuthRole[];
  fallback?: ReactNode;
}>;
