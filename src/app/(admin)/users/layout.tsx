import { PropsWithChildren } from "react";
import { PrincipalParamsProvider } from "@/contexts/PrincipalParamsContext";

export default function AdminUsersLayout({ children }: PropsWithChildren) {
  return <PrincipalParamsProvider>{children}</PrincipalParamsProvider>;
}
