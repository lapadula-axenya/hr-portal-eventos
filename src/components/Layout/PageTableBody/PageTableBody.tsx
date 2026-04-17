import { TableBody, TableCell, TableRow } from "@mui/material";
import {
  PageTableBodyProps,
  pageTableBodyCellStyles,
  pageTableBodyRow,
} from "@/components";

export function PageTableBody<T>(props: PageTableBodyProps<T>) {
  return (
    <TableBody>
      {props.items.map((item) => {
        const isActive = props?.selectedRowId === item.id;
        const isClickable = !!props.onClickRow;

        return (
          <TableRow
            key={item.id}
            {...(props.onClickRow && {
              onClick: () => props.onClickRow?.(item),
            })}
            sx={{
              ...pageTableBodyRow(isClickable, isActive),
            }}
          >
            {props.renderRow(item).map((row, index, array) => {
              const first = index === 0;
              const last = index === array.length - 1;

              return (
                <TableCell
                  key={row.title}
                  {...pageTableBodyCellStyles(
                    first,
                    last,
                    row.cellVerticalAlign,
                  )}
                >
                  {row.content}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
