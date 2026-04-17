import { Components, Theme } from "@mui/material";
import { typography } from "../typography";

export const MuiCheckbox: Components<Omit<Theme, "components">> = {
  MuiCheckbox: {
    styleOverrides: {
      root: {
        padding: 0,
        ".MuiSvgIcon-root": {
          width: "20px",
          height: "20px",
        },
        "& + .MuiTypography-root": {
          ...typography.body2,
          marginLeft: "0.5rem",
        },
      },
    },
  },
};
