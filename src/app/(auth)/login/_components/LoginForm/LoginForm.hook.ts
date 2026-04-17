import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SIGNUP_SUCCESS_PARAM } from "@/app/(auth)/signup/_components/SignupForm";
import { FormErrors, useFormHandler } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { errorMessages } from "@/messages/errorMessages";
import { snackbarErrorMessages } from "@/messages/snackbarErrorMessages";
import { login } from "@/services/auth/loginService";
import { LoginFormType } from "./LoginForm.props";

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openSnackbar } = useSnackbarContext();

  const { applyFormErrors, formErrors, formValues, handleFormChange } =
    useFormHandler<LoginFormType>({
      email: "",
      password: "",
    });

  const [isLoading, setIsLoading] = useState(false);

  const [showSignupSuccessMessage, setShowSignupSuccessMessage] =
    useState(false);

  const signupSuccess = searchParams.get(SIGNUP_SUCCESS_PARAM) === "true";

  useEffect(() => {
    if (signupSuccess) {
      setShowSignupSuccessMessage(true);
      router.replace(AppRoutes.AUTH.LOGIN);
    }
  }, [signupSuccess, router]);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors<LoginFormType> = {};

    if (!formValues.email.trim()) {
      newErrors.email = "Informe seu email.";
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Informe sua senha.";
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
      await login({
        email: formValues.email,
        password: formValues.password,
      });

      router.push(AppRoutes.MAIN.HOME);
    } catch {
      openSnackbar({
        title: "Falha no Login",
        text: errorMessages.invalidEmailOrPassword,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [formValues, openSnackbar, router, validateForm]);

  return {
    formValues,
    formErrors,
    isLoading,
    showSignupSuccessMessage,
    handleFormChange,
    handleSubmit,
  };
}
