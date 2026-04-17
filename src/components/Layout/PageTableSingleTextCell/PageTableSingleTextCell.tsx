import { Typography } from "@mui/material";
import {
  PageTableSingleTextCellProps,
  pageTableSingleTextCellContainerStyles,
} from "@/components";

export function PageTableSingleTextCell({
  text,
  ...props
}: PageTableSingleTextCellProps) {
  return (
    <Typography
      {...pageTableSingleTextCellContainerStyles}
      {...props}
      title={text}
    >
      {text ?? "-"}
    </Typography>
  );
}
