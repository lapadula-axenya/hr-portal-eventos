import { Components, Theme } from "@mui/material";
import { scrollbarStyle } from "@/theme/styles/scrollbar";
import { palette } from "../palette";

export const MuiTableContainer: Components<Omit<Theme, "components">> = {
  MuiTableContainer: {
    styleOverrides: {
      root: {
        ...scrollbarStyle,
        borderRadius: "8px",
        padding: "0 1.375rem",
        background: palette.grey[800],
        border: `1px solid ${palette.grey[700]}`,
      },
    },
  },
};
