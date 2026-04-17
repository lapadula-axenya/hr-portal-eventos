import { Collapse, Stack } from "@mui/material";
import { LockKeyholeIcon } from "lucide-react";
import {
  AuthForm,
  InputPassword,
  InputText,
  PasswordRules,
} from "@/components";
import { RecaptchaAction } from "@/hooks/useRecaptchaValidation";
import { UseChangePasswordFormReturn } from "./ChangePasswordForm.props";

export function ChangePasswordForm({
  email,
  formErrors,
  formValues,
  handleFormChange,
  handleSubmit,
  isLoading,
  rules,
  showPasswordRules,
}: UseChangePasswordFormReturn) {
  return (
    <Stack>
      <AuthForm
        icon={LockKeyholeIcon}
        title="Altere sua senha"
        description="Preencha os dados abaixo para alterar sua senha e acessar sua conta Axenya."
        externalHeader
        buttonLabel="Alterar senha"
        recaptchaAction={RecaptchaAction.CHANGE_PASSWORD}
        loading={isLoading}
        onSubmit={handleSubmit}
      >
        <InputText
          label="E-mail"
          type="email"
          value={email}
          helperText="Este é o e-mail vinculado à sua conta e não pode ser alterado."
          disabled
        />

        <InputPassword
          label="Senha"
          value={formValues.password}
          onChangeValue={(v) => handleFormChange("password", v)}
          error={!!formErrors.password}
          helperText={formErrors.password}
          disabled={isLoading}
        />

        <InputPassword
          label="Repetir senha"
          value={formValues.confirmPassword}
          onChangeValue={(v) => handleFormChange("confirmPassword", v)}
          error={!!formErrors.confirmPassword}
          helperText={formErrors.confirmPassword}
          disabled={isLoading}
        />

        <Collapse in={showPasswordRules}>
          <PasswordRules rules={rules} />
        </Collapse>
      </AuthForm>
    </Stack>
  );
}
