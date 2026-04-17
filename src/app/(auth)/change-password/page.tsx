"use client";

import { AuthSimpleContainer } from "@/components";
import { AccessKeyProvider } from "@/contexts/AccessKeyContext";
import { forgotPasswordToken } from "@/services/auth/forgotPasswordService";
import { ChangePasswordContainer } from "./_components/ChangePasswordContainer";

export default function ChangePasswordPage() {
  return (
    <AccessKeyProvider callback={forgotPasswordToken}>
      <AuthSimpleContainer>
        <ChangePasswordContainer />
      </AuthSimpleContainer>
    </AccessKeyProvider>
  );
}
