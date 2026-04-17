import { Collapse } from "@mui/material";
import {
  AuthForm,
  CheckboxWithLabelLink,
  InputPassword,
  InputText,
  PasswordRules,
} from "@/components";
import { RecaptchaAction } from "@/hooks/useRecaptchaValidation";
import { useSignupForm } from "./SignupForm.hook";

const LINK_PRIVACY = "https://axenya.com/privacidade";

export function SignupForm() {
  const {
    email,
    formErrors,
    formValues,
    handleFormChange,
    handleSubmit,
    isLoading,
    rules,
    showPasswordRules,
  } = useSignupForm();

  return (
    <AuthForm
      title="Crie sua conta"
      buttonLabel="Criar conta"
      recaptchaAction={RecaptchaAction.SIGNUP}
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

      <InputText
        label="Nome"
        value={formValues.firstName}
        onChangeValue={(v) => handleFormChange("firstName", v)}
        error={!!formErrors.firstName}
        helperText={formErrors.firstName}
        disabled={isLoading}
      />

      <InputText
        label="Sobrenome"
        value={formValues.lastName}
        onChangeValue={(v) => handleFormChange("lastName", v)}
        error={!!formErrors.lastName}
        helperText={formErrors.lastName}
        disabled={isLoading}
      />

      <InputPassword
        label="Crie uma senha"
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

      <CheckboxWithLabelLink
        checked={formValues.termsAccepted}
        onChange={(v) => handleFormChange("termsAccepted", v)}
        label="Ao criar uma conta, você concorda com nossos"
        labelLink="Termos de uso e Políticas de Privacidade"
        linkHref={LINK_PRIVACY}
        helperText={formErrors.termsAccepted}
        disabled={isLoading}
      />
    </AuthForm>
  );
}
