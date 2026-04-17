import { SxProps, TableCellProps } from "@mui/material";
import { VerticalAlign } from "./PageTableBody.props";

export const pageTableBodyRow = (
  isClickable: boolean,
  isActive: boolean,
): SxProps => ({
  ...(isClickable && {
    cursor: "pointer",
  }),
  ...(isClickable &&
    !isActive && {
      "&:hover": {
        ".MuiTableCell-root": {
          borderColor: "grey.500",
        },
      },
    }),
  ...(isActive && {
    ".MuiTableCell-root": {
      borderColor: "primary.main",
    },
  }),
});

export const pageTableBodyCellStyles = (
  first?: boolean,
  last?: boolean,
  cellVerticalAlign: VerticalAlign = "middle",
): TableCellProps => ({
  sx: {
    padding: "10px 20px",
    color: "grey.100",
    bgcolor: "grey.900",
    border: "1px solid",
    borderColor: "grey.900",
    transition: "all 0.1s",
    verticalAlign: cellVerticalAlign,
    ...(first && {
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
      borderRight: 0,
    }),
    ...(last && {
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
      borderLeft: 0,
    }),
    ...(!first &&
      !last && {
        borderInline: 0,
      }),
  },
});
