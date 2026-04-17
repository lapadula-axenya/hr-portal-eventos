import { SxProps } from "@mui/material";
import { scrollbarStyle } from "@/theme/styles/scrollbar";

export const overflowBoxContainerStyles = (
  maxHeight: string,
  isOverflow: boolean,
) => ({
  maxHeight,
  paddingTop: "0.5rem",
  ...(isOverflow && {
    paddingRight: "0.5rem !important",
  }),
  overflowX: "hidden",
  ...scrollbarStyle,
});

export const overflowBoxItemStyles = (spacing?: string): SxProps => ({
  ...(spacing && {
    "& > *:not(:last-child)": {
      marginBottom: spacing,
    },
  }),
});
