import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FormErrors, useFormHandler, usePasswordRules } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useAccessKeyContext } from "@/contexts/AccessKeyContext";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { AuthRole } from "@/enums/AuthRole";
import { snackbarErrorMessages } from "@/messages/snackbarErrorMessages";
import { signup } from "@/services/auth/signupService";
import { SignupFormType } from "./SignupForm.props";

export const SIGNUP_SUCCESS_PARAM = "signupSuccess";

export function useSignupForm() {
  const router = useRouter();
  const { openSnackbar } = useSnackbarContext();
  const { email, roles, token } = useAccessKeyContext();

  const { applyFormErrors, formErrors, formValues, handleFormChange } =
    useFormHandler<SignupFormType>({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    });

  const [isLoading, setIsLoading] = useState(false);

  const showPasswordRules =
    !!formValues.password || !!formValues.confirmPassword;
  const { isValidPassword, rules } = usePasswordRules({
    password: formValues.password,
    confirmPassword: formValues.confirmPassword,
  });

  const validateForm = useCallback(() => {
    const newErrors: FormErrors<SignupFormType> = {};

    if (!formValues.firstName.trim()) {
      newErrors.firstName = "Informe seu nome.";
    }

    if (!formValues.lastName.trim()) {
      newErrors.lastName = "Informe seu sobrenome.";
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Crie uma senha.";
    } else if (!isValidPassword) {
      newErrors.password = "A senha não atende aos critérios mínimos.";
    }

    if (!formValues.confirmPassword.trim()) {
      newErrors.confirmPassword = "Repita sua senha.";
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    if (!formValues.termsAccepted) {
      newErrors.termsAccepted = "É necessário aceitar os termos.";
    }

    return applyFormErrors(newErrors);
  }, [formValues, isValidPassword, applyFormErrors]);

  const handleSubmit = useCallback(async () => {
    if (!email) return;

    if (!validateForm()) {
      openSnackbar({
        ...snackbarErrorMessages.invalidFields,
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        token,
        email,
        roles: roles ?? [AuthRole.USER],
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      });

      router.push(`${AppRoutes.AUTH.LOGIN}?${SIGNUP_SUCCESS_PARAM}=true`);
    } catch {
      openSnackbar({
        ...snackbarErrorMessages.internalError,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, email, roles, formValues, openSnackbar, validateForm, router]);

  return {
    email,
    formValues,
    formErrors,
    isLoading,
    rules,
    showPasswordRules,
    handleFormChange,
    handleSubmit,
  };
}
