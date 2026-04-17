import { Components, Theme } from "@mui/material";
import { ChevronDownIcon } from "lucide-react";

export const MuiSelect: Components<Omit<Theme, "components">> = {
  MuiSelect: {
    defaultProps: {
      MenuProps: {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        PaperProps: {
          sx: {
            marginTop: "8px",
          },
        },
      },
      IconComponent: ChevronDownIcon,
    },
    styleOverrides: {
      root: {
        ".MuiSelect-icon": {
          width: 16,
          height: 16,
        },
      },
    },
  },
};
