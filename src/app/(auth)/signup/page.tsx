"use client";

import { AuthContainer, AuthHeader } from "@/components";
import { AccessKeyProvider } from "@/contexts/AccessKeyContext";
import { singupToken } from "@/services/auth/signupService";
import { SignupForm } from "./_components/SignupForm";

export default function SignupPage() {
  return (
    <AccessKeyProvider callback={singupToken}>
      <AuthContainer>
        <AuthHeader />
        <SignupForm />
      </AuthContainer>
    </AccessKeyProvider>
  );
}
