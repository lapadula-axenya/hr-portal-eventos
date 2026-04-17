import { Stack } from "@mui/material";
import { CheckCheckIcon } from "lucide-react";
import { FeedbackMessage } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import {
  ChangePasswordForm,
  useChangePasswordForm,
} from "../ChangePasswordForm";

export function ChangePasswordContainer() {
  const changePasswordFormData = useChangePasswordForm();

  return (
    <Stack>
      {!changePasswordFormData.showSuccess && (
        <ChangePasswordForm {...changePasswordFormData} />
      )}
      {changePasswordFormData.showSuccess && (
        <FeedbackMessage
          icon={CheckCheckIcon}
          title="Senha alterada com sucesso!"
          description="Pronto! Agora você já pode fazer seu login da sua conta Axenya."
          textContainerSize="small"
          buttonLabel="Fazer login"
          href={AppRoutes.AUTH.LOGIN}
        />
      )}
    </Stack>
  );
}
