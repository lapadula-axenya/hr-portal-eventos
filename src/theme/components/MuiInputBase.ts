import { Components, Theme } from "@mui/material";
import { pxToRem } from "@/utils/pxToRem";
import { palette } from "../palette";

export const MuiInputBase: Components<Omit<Theme, "components">> = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        height: pxToRem(40),
        border: `1px solid ${palette.grey[500]}`,
        background: palette.grey[900],
        fontSize: 14,
        borderRadius: "8px !important",
        "&.Mui-focused": {
          borderColor: palette.grey[300],
        },
        "&.Mui-error": {
          borderColor: palette.error.light,
        },
        "&.Mui-disabled": {
          background: palette.grey[700],
        },
      },
    },
  },
};
