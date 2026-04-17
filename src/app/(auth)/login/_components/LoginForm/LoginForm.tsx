import { Stack } from "@mui/material";
import { AuthForm, InputPassword, InputText } from "@/components";
import { authFormContainerStyles } from "@/components/Auth/AuthForm/AuthForm.styles";
import { RecaptchaAction } from "@/hooks/useRecaptchaValidation";
import { useLoginForm } from "./LoginForm.hook";
import { LoginForgotPasswordLink } from "../LoginForgotPasswordLink";
import { LoginSignupSuccessMessage } from "../LoginSignupSuccessMessage";

export function LoginForm() {
  const {
    formErrors,
    formValues,
    handleFormChange,
    handleSubmit,
    isLoading,
    showSignupSuccessMessage,
  } = useLoginForm();

  return (
    <Stack {...authFormContainerStyles}>
      {showSignupSuccessMessage && <LoginSignupSuccessMessage />}

      <AuthForm
        title="Acesse sua conta"
        description="Entre e comece a gerenciar a saúde dos seus colaboradores."
        buttonLabel="Entrar"
        recaptchaAction={RecaptchaAction.LOGIN}
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

        <InputPassword
          label="Senha"
          value={formValues.password}
          onChangeValue={(v) => handleFormChange("password", v)}
          error={!!formErrors.password}
          helperText={formErrors.password}
          disabled={isLoading}
        />

        <LoginForgotPasswordLink />
      </AuthForm>
    </Stack>
  );
}
