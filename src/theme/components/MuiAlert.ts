import { Components, Theme } from "@mui/material";
import { palette } from "../palette";

export const MuiAlert: Components<Omit<Theme, "components">> = {
  MuiAlert: {
    styleOverrides: {
      root: {
        position: "relative",
      },
      standardInfo: {
        background: palette.grey[500],
      },
      standardError: {
        background: palette.error.dark,
      },
      message: {
        color: palette.white,
        maxWidth: "calc(100% - 32px)",
      },
      icon: {
        display: "none",
      },
      action: {
        color: palette.grey[100],
        paddingTop: 0,
        alignItems: "center",
        position: "absolute",
        right: 10,
        top: 2,
      },
    },
  },
};
