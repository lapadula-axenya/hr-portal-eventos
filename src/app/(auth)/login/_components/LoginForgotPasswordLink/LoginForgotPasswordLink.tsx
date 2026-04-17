import { Stack } from "@mui/material";
import { LinkButton } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { loginForgotPasswordLinkStyles } from "./LoginForgotPasswordLink.styles";

export function LoginForgotPasswordLink() {
  return (
    <Stack>
      <LinkButton
        {...loginForgotPasswordLinkStyles}
        href={AppRoutes.AUTH.FORGOT_PASSWORD}
      >
        Esqueci minha senha
      </LinkButton>
    </Stack>
  );
}
