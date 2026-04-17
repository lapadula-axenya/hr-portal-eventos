import { MenuProps, StackProps } from "@mui/material";

export const actionMenuContainerStyles: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

export const actionMenuItemStyles: StackProps = {
  direction: "row",
  alignItems: "center",
  spacing: "0.5rem",
};
