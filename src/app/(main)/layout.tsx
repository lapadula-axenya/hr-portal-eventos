"use client";

import { PropsWithChildren } from "react";
import { AthenaFloatingChat, ProtectedLayout } from "@/components";
import { CompanyProvider } from "@/contexts/CompanyContext";
import { AuthRole } from "@/enums/AuthRole";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <ProtectedLayout allowedRoles={[AuthRole.USER, AuthRole.ADMIN]}>
      <CompanyProvider>
        {children}
        <AthenaFloatingChat />
      </CompanyProvider>
    </ProtectedLayout>
  );
}
