import { Card, CardContent, Stack, Typography } from "@mui/material";
import { CircleCheckIcon } from "lucide-react";
import {
  loginSignupSuccessMessageContentStyles,
  loginSignupSuccessMessageIconStyles,
  loginSignupSuccessMessageStyles,
} from "./LoginSignupSuccessMessage.styles";

export function LoginSignupSuccessMessage() {
  return (
    <Card {...loginSignupSuccessMessageStyles}>
      <CardContent>
        <Stack {...loginSignupSuccessMessageContentStyles}>
          <CircleCheckIcon {...loginSignupSuccessMessageIconStyles} />
          <Typography>Cadastro criado com sucesso.</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
