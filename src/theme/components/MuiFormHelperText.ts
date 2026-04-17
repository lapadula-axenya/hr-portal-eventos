import { Components, Theme } from "@mui/material";
import { palette } from "../palette";
import { typography } from "../typography";

export const MuiFormHelperText: Components<Omit<Theme, "components">> = {
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginTop: 8,
        marginLeft: 0,
        ...typography.body2,
        "&.Mui-error": {
          color: palette.error.light,
        },
      },
    },
  },
};
