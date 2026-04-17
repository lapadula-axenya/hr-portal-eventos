import { Components, Theme } from "@mui/material";

export const MuiCardContent: Components<Omit<Theme, "components">> = {
  MuiCardContent: {
    styleOverrides: {
      root: {
        "&:last-child": {
          padding: "1rem",
        },
        "& + .MuiCardContent-root": {
          paddingTop: "0 !important",
        },
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      },
    },
  },
};
