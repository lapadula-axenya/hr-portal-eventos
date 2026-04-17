"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingScreen, PageLayout, ProtectedLayoutProps } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useAuthContext } from "@/contexts/AuthContext";

export function ProtectedLayout({
  allowedRoles,
  children,
  fallbackRoute = AppRoutes.MAIN.HOME,
}: ProtectedLayoutProps) {
  const { hasAnyRole, roles, user } = useAuthContext();

  const router = useRouter();

  const isLoading = user === undefined || roles.length === 0;

  const isUnauthorized = user && !hasAnyRole(allowedRoles);

  useEffect(() => {
    if (user === null) {
      router.replace(AppRoutes.AUTH.LOGIN);
    } else if (isUnauthorized) {
      router.replace(fallbackRoute);
    }
  }, [user, isUnauthorized, router, fallbackRoute]);

  if (isLoading) return <LoadingScreen />;

  if (isUnauthorized) return null;

  return <PageLayout>{children}</PageLayout>;
}
