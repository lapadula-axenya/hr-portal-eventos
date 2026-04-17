import { Components, Theme } from "@mui/material";
import { palette } from "../palette";
import { typography } from "../typography";

export const MuiInputLabel: Components<Omit<Theme, "components">> = {
  MuiInputLabel: {
    styleOverrides: {
      root: {
        ...typography.subtitle2,
        fontWeight: "bold",
        position: "absolute",
        transform: "translate(0, 0)",
        color: `${palette.white} !important`,
      },
    },
  },
};
