import { Components, Theme } from "@mui/material";
import { pxToRem } from "@/utils/pxToRem";
import { palette } from "../palette";

export const MuiDialog: Components<Omit<Theme, "components">> = {
  MuiDialog: {
    styleOverrides: {
      root: {
        margin: "auto",
      },
      paper: {
        background: palette.grey[800],
        border: `1px solid ${palette.grey[700]}`,
        borderRadius: 12,
        padding: pxToRem(24),
        margin: 0,
        width: "100%",
      },
    },
  },
};
