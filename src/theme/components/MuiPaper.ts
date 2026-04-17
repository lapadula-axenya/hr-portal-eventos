import { Components, Theme } from "@mui/material";
import { palette } from "../palette";

export const MuiPaper: Components<Omit<Theme, "components">> = {
  MuiPaper: {
    styleOverrides: {
      elevation: {
        background: palette.background.default,
      },
    },
  },
};
