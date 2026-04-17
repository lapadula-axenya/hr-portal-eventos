import { Components, Theme } from "@mui/material";
import { palette } from "../palette";

export const MuiCard: Components<Omit<Theme, "components">> = {
  MuiCard: {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      root: {
        borderRadius: 12,
        "&[data-active]": {
          borderColor: `${palette.primary.main} !important`,
        },
        "&[data-hoverable]": {
          ":has(.MuiCardActionArea-root):hover": {
            borderColor: palette.grey[300],
          },
          ".MuiCardActionArea-root:hover": {
            ".MuiCardActionArea-focusHighlight": {
              opacity: 0,
            },
          },
        },
      },
    },
  },
};
