import { Components, Theme } from "@mui/material";

export const MuiOutlinedInput: Components<Omit<Theme, "components">> = {
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        display: "none",
      },
    },
  },
};
