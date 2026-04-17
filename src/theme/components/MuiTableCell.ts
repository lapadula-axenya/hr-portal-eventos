import { Components, Theme } from "@mui/material";
import { palette } from "../palette";
import { typography } from "../typography";

export const MuiTableCell: Components<Omit<Theme, "components">> = {
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: "none",
        padding: "0",
      },
      head: {
        background: palette.grey[800],
        color: palette.grey[100],
        padding: "1rem 1.438rem",
        ...typography.body1,
      },
    },
  },
};
