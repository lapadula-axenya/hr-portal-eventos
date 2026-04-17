import { AuthForm, InputText } from "@/components";
import { RecaptchaAction } from "@/hooks/useRecaptchaValidation";
import { UseForgotPasswordFormReturn } from "./ForgotPasswordForm.props";

export function ForgotPasswordForm({
  formErrors,
  formValues,
  handleFormChange,
  handleSubmit,
  isLoading,
}: UseForgotPasswordFormReturn) {
  return (
    <AuthForm
      title="Recupere sua senha"
      description="Insira seu e-mail corporativo cadastrado abaixo para receber um link de redefinição de senha. Confira sua caixa de entrada e também sua pasta de spam."
      externalHeader
      buttonLabel="Enviar"
      recaptchaAction={RecaptchaAction.FORGOT_PASSWORD}
      loading={isLoading}
      onSubmit={handleSubmit}
    >
      <InputText
        label="E-mail"
        type="email"
        value={formValues.email}
        onChangeValue={(v) => handleFormChange("email", v)}
        error={!!formErrors.email}
        helperText={formErrors.email}
        disabled={isLoading}
      />
    </AuthForm>
  );
}
