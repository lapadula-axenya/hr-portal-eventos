import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import {
  PageTableSkeletonProps,
  usePageTableSkeleton,
  pageTableBodyCellStyles,
} from "@/components";

export function PageTableSkeleton(props: PageTableSkeletonProps) {
  const { skeletonCells, skeletonRows } = usePageTableSkeleton(props);

  return (
    <TableBody>
      {skeletonRows.map((row) => (
        <TableRow key={row.id}>
          {skeletonCells.map((cell, index) => {
            const first = index === 0;
            const last = index === skeletonCells.length - 1;

            return (
              <TableCell
                key={cell.id}
                {...pageTableBodyCellStyles(first, last)}
              >
                <Skeleton width="100%" />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
