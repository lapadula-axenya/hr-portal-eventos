import { Components, Theme } from "@mui/material";
import { palette } from "../palette";

export const MuiChip: Components<Omit<Theme, "components">> = {
  MuiChip: {
    styleOverrides: {
      root: {
        border: `1px solid ${palette.grey[500]}`,
        background: palette.grey[900],
        color: palette.grey[100],
        fontSize: 10,
        letterSpacing: "0.6px",
        height: "auto",
      },
      label: {
        lineHeight: "18px",
        paddingInline: "10px",
      },
    },
  },
};
