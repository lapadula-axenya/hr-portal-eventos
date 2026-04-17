"use client";

import { Button, Stack, Typography } from "@mui/material";
import { theme } from "@/theme";
import { useCookieBar } from "./CookieBar.hook";

export function CookieBar() {
  const { handleClick, hasConsent } = useCookieBar();

  if (hasConsent !== false) return null;

  return (
    <Stack
      sx={{
        border: "1px solid #6F6F6F",
        bgcolor: theme.palette.grey[700],
        borderRadius: "0.5rem",
        padding: "1rem 2rem",
        justifyContent: "space-between",
        width: "calc(100% - 4rem)",
        maxWidth: "84rem",
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        gap: "1.5rem",
        [theme.breakpoints.up("sm")]: {
          flexDirection: "row",
          padding: "1rem",
        },
      }}
    >
      <Typography maxWidth="40rem">
        Utilizamos cookies para oferecer melhor experiência, melhorar o
        desempenho, analisar como você interage em nosso site e personalizar
        conteúdo.
      </Typography>

      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          width: "4.75rem",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        }}
      >
        Ok
      </Button>
    </Stack>
  );
}
