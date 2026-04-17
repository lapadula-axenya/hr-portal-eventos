import { Stack } from "@mui/material";
import { CheckCheckIcon } from "lucide-react";
import { FeedbackMessage } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import {
  ForgotPasswordForm,
  useForgotPasswordForm,
} from "../ForgotPasswordForm";

export function ForgotPasswordContainer() {
  const forgotPasswordFormData = useForgotPasswordForm();

  return (
    <Stack>
      {!forgotPasswordFormData.showSuccess && (
        <ForgotPasswordForm {...forgotPasswordFormData} />
      )}
      {forgotPasswordFormData.showSuccess && (
        <FeedbackMessage
          icon={CheckCheckIcon}
          title="E-mail enviado com sucesso!"
          description="Um e-mail com link de redefinição de senha foi enviado para sua caixa de entrada."
          textContainerSize="small"
          buttonLabel="Fazer login"
          href={AppRoutes.AUTH.LOGIN}
        />
      )}
    </Stack>
  );
}
