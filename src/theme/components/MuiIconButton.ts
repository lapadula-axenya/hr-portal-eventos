import { Components, Theme } from "@mui/material";

export const MuiIconButton: Components<Omit<Theme, "components">> = {
  MuiIconButton: {
    defaultProps: {
      size: "small",
    },
  },
};
