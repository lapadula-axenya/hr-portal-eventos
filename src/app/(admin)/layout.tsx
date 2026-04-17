"use client";

import { PropsWithChildren } from "react";
import { ProtectedLayout } from "@/components";
import { CompanyProvider } from "@/contexts/CompanyContext";
import { AuthRole } from "@/enums/AuthRole";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <ProtectedLayout allowedRoles={[AuthRole.ADMIN]}>
      <CompanyProvider>{children}</CompanyProvider>
    </ProtectedLayout>
  );
}
