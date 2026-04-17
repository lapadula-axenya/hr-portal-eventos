import { useCallback, useState } from "react";
import { FormErrors, useFormHandler, usePasswordRules } from "@/components";
import { useAccessKeyContext } from "@/contexts/AccessKeyContext";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { snackbarErrorMessages } from "@/messages/snackbarErrorMessages";
import { changePassword } from "@/services/auth/forgotPasswordService/forgotPasswordService";
import { ChangePasswordFormType } from "./ChangePasswordForm.props";

export function useChangePasswordForm() {
  const { openSnackbar } = useSnackbarContext();
  const { email, token } = useAccessKeyContext();

  const { applyFormErrors, formErrors, formValues, handleFormChange } =
    useFormHandler<ChangePasswordFormType>({
      password: "",
      confirmPassword: "",
    });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const showPasswordRules =
    !!formValues.password || !!formValues.confirmPassword;
  const { isValidPassword, rules } = usePasswordRules({
    password: formValues.password,
    confirmPassword: formValues.confirmPassword,
  });

  const validateForm = useCallback(() => {
    const newErrors: FormErrors<ChangePasswordFormType> = {};

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

    return applyFormErrors(newErrors);
  }, [formValues, isValidPassword, applyFormErrors]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      openSnackbar({
        ...snackbarErrorMessages.invalidFields,
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      await changePassword({
        token,
        email,
        password: formValues.password,
      });
      setShowSuccess(true);
    } catch {
      openSnackbar({
        ...snackbarErrorMessages.internalError,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, email, formValues, openSnackbar, validateForm]);

  return {
    email,
    formValues,
    formErrors,
    isLoading,
    rules,
    showPasswordRules,
    showSuccess,
    handleFormChange,
    handleSubmit,
  };
}
