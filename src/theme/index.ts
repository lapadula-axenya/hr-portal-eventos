import { createTheme } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import { components } from "./components";
import { paletteOptions } from "./palette";
import { typography } from "./typography";

export const theme = createTheme(
  {
    palette: {
      mode: "dark",
      ...paletteOptions,
    },
    typography,
    components,
    cssVariables: true,
    spacing: 16,
  },
  ptBR,
);
