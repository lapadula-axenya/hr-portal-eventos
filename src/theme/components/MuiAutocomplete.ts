import { Components, Theme } from "@mui/material";
import { scrollbarStyle } from "@/theme/styles/scrollbar";
import { pxToRem } from "@/utils/pxToRem";
import { palette } from "../palette";

export const MuiAutocomplete: Components<Omit<Theme, "components">> = {
  MuiAutocomplete: {
    styleOverrides: {
      listbox: {
        ...scrollbarStyle,
        maxHeight: pxToRem(300),
        background: palette.grey[700],
      },
      root: {
        ".MuiChip-label": {
          color: "white",
        },
      },
    },
  },
};
