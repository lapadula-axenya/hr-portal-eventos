"use client";

import { AuthContainer, AuthHeader } from "@/components";
import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <AuthContainer>
      <AuthHeader />
      <LoginForm />
    </AuthContainer>
  );
}
