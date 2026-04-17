import { Components, Theme } from "@mui/material";
import { palette } from "../palette";

export const MuiTooltip: Components<Omit<Theme, "components">> = {
  MuiTooltip: {
    defaultProps: {
      arrow: true,
      placement: "top",
    },
    styleOverrides: {
      tooltip: {
        background: `${palette.grey[700]} !important`,
        padding: "9px 15px",
      },
      arrow: {
        color: "grey.700",
      },
    },
  },
};
