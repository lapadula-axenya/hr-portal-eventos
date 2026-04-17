import { CSSProperties } from "react";
import { SxProps } from "@mui/material";
import { theme } from "@/theme";

export const inputDragAndDropCardStyles = (
  hover: boolean,
  disabled?: boolean,
): SxProps => ({
  transition: "0.2s all",
  ...(hover && {
    border: `1px dashed ${theme.palette.primary.main}`,
    background: theme.palette.primary.dark,
  }),
  ...(disabled && {
    opacity: 0.5,
  }),
});

export const inputDragAndDropHiddenInputStyles: CSSProperties = {
  height: "100%",
  width: "100%",
  position: "absolute",
  bottom: 0,
  left: 0,
  opacity: 0,
  cursor: "pointer",
};
