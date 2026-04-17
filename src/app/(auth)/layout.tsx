"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useAuthContext } from "@/contexts/AuthContext";
import { RecaptchaProvider } from "@/providers/RecaptchaProvider";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(AppRoutes.MAIN.HOME);
    }
  }, [user, router]);

  if (user === undefined) return <LoadingScreen />;

  if (user) return null;

  return <RecaptchaProvider>{children}</RecaptchaProvider>;
}
