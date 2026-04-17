import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  LoadingButton,
  PageHeaderFileProcessingSummaryTableProps,
  pageHeaderFileProcessingSummaryTableBodyStyles,
  pageHeaderFileProcessingSummaryTableContainerStyles,
  pageHeaderFileProcessingSummaryTableHeadStyles,
} from "@/components";

export function PageHeaderFileProcessingSummaryTable({
  errors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: PageHeaderFileProcessingSummaryTableProps) {
  const tableRows = errors.flatMap(({ errors: rowErrors, line }) =>
    rowErrors.map((err) => ({ line, ...err })),
  );

  return (
    <Box sx={pageHeaderFileProcessingSummaryTableContainerStyles}>
      <Table size="small" stickyHeader>
        <TableHead {...pageHeaderFileProcessingSummaryTableHeadStyles}>
          <TableRow>
            <TableCell>Linha</TableCell>
            <TableCell>Coluna</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Descrição do Erro</TableCell>
          </TableRow>
        </TableHead>

        <TableBody {...pageHeaderFileProcessingSummaryTableBodyStyles}>
          {tableRows.map((row, index) => (
            <TableRow key={`${row.line}-${row.column}-${index}`}>
              <TableCell>{row.line}</TableCell>
              <TableCell>{row.column}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.errorDescription}</TableCell>
            </TableRow>
          ))}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 1 }}>
                <CircularProgress size={20} />
              </TableCell>
            </TableRow>
          )}
          {hasNextPage && (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 0.5 }}>
                <LoadingButton
                  size="small"
                  loading={isFetchingNextPage}
                  onClick={fetchNextPage}
                >
                  Carregar mais
                </LoadingButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
