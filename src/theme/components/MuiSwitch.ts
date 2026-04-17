import { Components, Theme } from "@mui/material";
import { pxToRem } from "@/utils/pxToRem";
import { palette } from "../palette";

export const MuiSwitch: Components<Omit<Theme, "components">> = {
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: pxToRem(40),
        height: pxToRem(24),
        padding: 0,
      },
      switchBase: {
        padding: 0,
        margin: pxToRem(2),
        transitionDuration: "300ms",
        "&.Mui-checked": {
          transform: "translateX(1rem)",
          color: palette.grey[500],
          "& + .MuiSwitch-track": {
            background: palette.primary.main,
            opacity: 1,
            border: 0,
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5,
          },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
          color: palette.primary.main,
          border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
          color: palette.grey[100],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.3,
        },
      },
      thumb: {
        boxSizing: "border-box",
        width: pxToRem(20),
        height: pxToRem(20),
        transform: "scale(0.8)",
      },
      track: {
        borderRadius: 26 / 2,
        backgroundColor: palette.grey[500],
        opacity: 1,
      },
    },
  },
};
