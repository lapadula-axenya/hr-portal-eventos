import { Components, Theme } from "@mui/material";
import { palette } from "../palette";
import { typography } from "../typography";

export const MuiBadge: Components<Omit<Theme, "components">> = {
  MuiBadge: {
    styleOverrides: {
      badge: {
        border: `1px solid ${palette.grey[700]}`,
        ...typography.overline,
        display: "flex",
        minWidth: "1rem",
        height: "1rem",
        padding: 0,
      },
    },
  },
};
