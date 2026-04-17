import { Components, Theme } from "@mui/material";

export const MuiButtonBase: Components<Omit<Theme, "components">> = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        borderRadius: 4,
      },
    },
  },
};
