import { Stack, Typography } from "@mui/material";
import {
  BrandLogo,
  authHeaderContainerStyles,
  authHeaderDescriptionStyles,
  authHeaderTextContainerStyles,
  authHeaderTitleStyles,
} from "@/components";

export function AuthHeader() {
  return (
    <Stack {...authHeaderContainerStyles}>
      <BrandLogo />

      <Stack {...authHeaderTextContainerStyles}>
        <Typography {...authHeaderTitleStyles}>
          Boas-vindas ao seu novo espaço Axenya!
        </Typography>

        <Typography {...authHeaderDescriptionStyles}>
          Um jeito simples e seguro para gerenciar os dados de saúde dos seus
          colaboradores, otimizando o dia a dia do seu time de RH.
        </Typography>
      </Stack>
    </Stack>
  );
}
