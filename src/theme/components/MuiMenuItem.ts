import { Components, Theme } from "@mui/material";
import { palette } from "../palette";

export const MuiMenuItem: Components<Omit<Theme, "components">> = {
  MuiMenuItem: {
    styleOverrides: {
      root: {
        color: `${palette.white} !important`,
      },
    },
  },
};
