"use client";

import { Button, Typography } from "@mui/material";
import { CenterContainer } from "@/components";
import { AxsysThemeProvider } from "@/providers/AxsysThemeProvider";
import "./global.css";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body>
        <AxsysThemeProvider>
          <CenterContainer height="100vh">
            <Typography variant="h3" mb="2rem">
              Algo deu errado!
            </Typography>
            <Button onClick={reset}>Tentar novamente</Button>
          </CenterContainer>
        </AxsysThemeProvider>
      </body>
    </html>
  );
}
