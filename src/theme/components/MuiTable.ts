import { Components, Theme } from "@mui/material";

export const MuiTable: Components<Omit<Theme, "components">> = {
  MuiTable: {
    defaultProps: {
      stickyHeader: true,
    },
  },
};
