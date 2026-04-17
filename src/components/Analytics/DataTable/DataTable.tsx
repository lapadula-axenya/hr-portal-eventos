"use client";

import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ChartConfig } from "@/services/analyticsService";

type ColumnDef = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
};

type Props = {
  chartConfig?: ChartConfig;
  data: Record<string, unknown>[];
};

const PAGE_SIZE = 50;

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "—";
  return String(value);
}

export function DataTable({ chartConfig, data }: Props) {
  const [page, setPage] = useState(0);

  if (!data.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        Nenhum dado encontrado.
      </Typography>
    );
  }

  const configColumns = chartConfig?.columns as ColumnDef[] | undefined;
  const columns: ColumnDef[] = configColumns?.length
    ? configColumns
    : Object.keys(data[0]).map((key) => ({ key, label: key }));

  const paginated =
    data.length > PAGE_SIZE
      ? data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
      : data;

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align}
                  sx={{ fontWeight: 600 }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((row, i) => (
              <TableRow key={i} hover>
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align}>
                    {formatCell(row[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > PAGE_SIZE && (
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={PAGE_SIZE}
          rowsPerPageOptions={[PAGE_SIZE]}
          labelDisplayedRows={({ count, from, to }) =>
            `${from}-${to} de ${count}`
          }
        />
      )}
    </>
  );
}
