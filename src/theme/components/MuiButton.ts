import { Components, Theme } from "@mui/material";
import { pxToRem } from "@/utils/pxToRem";
import { palette } from "../palette";
import { typography } from "../typography";

export const MuiButton: Components<Omit<Theme, "components">> = {
  MuiButton: {
    defaultProps: {
      variant: "contained",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        height: 40,
        padding: `${pxToRem(10)} ${pxToRem(16)}`,
        borderRadius: pxToRem(8),
        ...(ownerState.size === "small" && {
          padding: `${pxToRem(4)} ${pxToRem(4)}`,
          borderRadius: pxToRem(4),
          ...typography.caption,
        }),
      }),
      containedPrimary: {
        "&:hover": {
          color: palette.primary.main,
        },
      },
      outlinedSecondary: {
        color: palette.grey?.[100],
      },
      containedInherit: {
        background: palette.grey[500],
      },
    },
  },
};
