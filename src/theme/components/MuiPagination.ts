import { Components, Theme } from "@mui/material";
import { palette } from "../palette";

export const MuiPagination: Components<Omit<Theme, "components">> = {
  MuiPagination: {
    styleOverrides: {
      root: {
        ".MuiPaginationItem-previousNext": {
          color: `${palette.grey[300]} !important`,
        },
        ".MuiPaginationItem-page": {
          width: 45,
          height: 34,
          borderRadius: 8,
          color: `${palette.grey[300]} !important`,
        },
        ".MuiPaginationItem-page.Mui-selected": {
          color: `${palette.grey[900]} !important`,
          background: `${palette.primary.main} !important`,
        },
        ".MuiPaginationItem-page.Mui-disabled": {
          background: `${palette.grey[300]} !important`,
        },
      },
    },
  },
};
