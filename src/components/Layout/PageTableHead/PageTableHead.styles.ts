import { TableCellProps } from "@mui/material";
import { TitleAlign } from "../PageTableBody";

export const pageTableHeadCellStyles = (
  width?: string,
  titleAlign: TitleAlign = "left",
): TableCellProps => ({
  sx: {
    ...(width && {
      width,
      minWidth: width,
    }),
    height: "58px",
    fontSize: 14,
    fontWeight: 700,
    textAlign: titleAlign,
  },
});
