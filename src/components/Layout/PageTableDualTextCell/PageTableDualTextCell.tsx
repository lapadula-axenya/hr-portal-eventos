import { Stack } from "@mui/material";
import {
  PageTableDualTextCellProps,
  PageTableSingleTextCell,
  pageTableDualTextCellPrimaryStyles,
} from "@/components";

export function PageTableDualTextCell(props: PageTableDualTextCellProps) {
  return (
    <Stack>
      <PageTableSingleTextCell
        {...pageTableDualTextCellPrimaryStyles}
        text={props.primaryText}
      />
      <PageTableSingleTextCell text={props.secondaryText} />
    </Stack>
  );
}
