import { Components, Theme } from "@mui/material";
import { pxToRem } from "@/utils/pxToRem";
import { palette } from "../palette";

export const MuiFormControl: Components<Omit<Theme, "components">> = {
  MuiFormControl: {
    styleOverrides: {
      root: {
        paddingTop: pxToRem(24),
        position: "relative",
        ".MuiPickersInputBase-root": {
          height: pxToRem(40),
          border: `1px solid ${palette.grey[500]}`,
          background: palette.grey[900],
          fontSize: 14,
          borderRadius: "8px !important",
          padding: "0 8px 0 4px",
          "&.Mui-focused": {
            borderColor: palette.grey[300],
          },
          "&.Mui-error": {
            borderColor: palette.error.light,
          },
          "&.Mui-disabled": {
            background: palette.grey[700],
          },
          "& .MuiInputAdornment-root": {
            order: -1,
            margin: "0 8px 0 0",
          },
        },
        ".MuiPickersOutlinedInput-notchedOutline": {
          display: "none",
        },
      },
    },
  },
};
