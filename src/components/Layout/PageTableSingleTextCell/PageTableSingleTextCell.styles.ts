import { TypographyProps } from "@mui/material";

export const pageTableSingleTextCellContainerStyles: TypographyProps = {
  variant: "body2",
  sx: {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};
