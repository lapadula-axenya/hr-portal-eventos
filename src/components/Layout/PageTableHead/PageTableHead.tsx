import { TableCell, TableHead, TableRow } from "@mui/material";
import { PageTableHeadProps, pageTableHeadCellStyles } from "@/components";

export function PageTableHead<T>(props: PageTableHeadProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {props.renderRow().map((row) => (
          <TableCell
            key={row.title}
            {...pageTableHeadCellStyles(row.width, row?.titleAlign)}
          >
            {!row.hideTitle && !row?.titleElement ? row.title : ""}
            {row?.titleElement}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
