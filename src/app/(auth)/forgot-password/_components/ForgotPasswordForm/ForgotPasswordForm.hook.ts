import { useCallback, useState } from "react";
import { FormErrors, useFormHandler } from "@/components";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { snackbarErrorMessages } from "@/messages/snackbarErrorMessages";
import { forgotPassword } from "@/services/auth/forgotPasswordService";
import { ForgotPasswordFormType } from "./ForgotPasswordForm.props";

export function useForgotPasswordForm() {
  const { openSnackbar } = useSnackbarContext();

  const { applyFormErrors, formErrors, formValues, handleFormChange } =
    useFormHandler<ForgotPasswordFormType>({
      email: "",
    });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors<ForgotPasswordFormType> = {};

    if (!formValues.email.trim()) {
      newErrors.email = "Informe seu email.";
    }

    return applyFormErrors(newErrors);
  }, [formValues, applyFormErrors]);

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
      await forgotPassword({ email: formValues.email });
      setShowSuccess(true);
    } catch {
      openSnackbar({
        ...snackbarErrorMessages.internalError,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [formValues, openSnackbar, validateForm]);

  return {
    formValues,
    formErrors,
    isLoading,
    showSuccess,
    handleFormChange,
    handleSubmit,
  };
}
