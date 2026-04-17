import { Components, Theme } from "@mui/material";
import { scrollbarStyle } from "@/theme/styles/scrollbar";
import { pxToRem } from "@/utils/pxToRem";
import { palette } from "../palette";

export const MuiMenu: Components<Omit<Theme, "components">> = {
  MuiMenu: {
    styleOverrides: {
      paper: {
        ...scrollbarStyle,
        borderRadius: "12px",
        maxHeight: pxToRem(300),
        background: palette.grey[800],
        border: `1px solid ${palette.grey[500]}`,
      },
      list: {
        padding: "1.2rem 0.7rem",
        ".MuiMenuItem-root": {
          color: palette.primary.main,
        },
      },
    },
  },
};
