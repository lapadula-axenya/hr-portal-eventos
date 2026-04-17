import { SnackbarProps } from "@mui/material";

export const actionSnackbarContainerStyles: SnackbarProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  sx: {
    zIndex: 1,
    bottom: "50px",
    ".MuiPaper-root": {
      bgcolor: "primary.dark",
      color: "white",
      padding: "4px 16px",
      borderRadius: "8px",
      minWidth: "380px",
      margin: "0 8px 24px 0",
    },
  },
};
