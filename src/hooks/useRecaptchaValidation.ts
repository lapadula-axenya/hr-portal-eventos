import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { errorMessages } from "@/messages/errorMessages";
import { validateRecaptcha } from "@/services/auth/recaptchaService";

export const RecaptchaAction = {
  SIGNUP: "SIGNUP",
  LOGIN: "LOGIN",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
} as const;

export const useRecaptchaValidation = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { openSnackbar } = useSnackbarContext();

  const recaptchaValidation = async (action: string): Promise<boolean> => {
    if (!executeRecaptcha) {
      return false;
    }

    try {
      const recaptchaToken = await executeRecaptcha(action);
      const isValid = await validateRecaptcha(recaptchaToken);
      return isValid.data;
    } catch {
      openSnackbar({
        title: "Erro no reCAPTCHA",
        text: errorMessages.recaptchaFailed,
        type: "error",
      });
      return false;
    }
  };

  return { recaptchaValidation };
};
