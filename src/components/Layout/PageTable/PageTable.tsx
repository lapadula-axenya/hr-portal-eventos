import { Stack, Table, TableContainer, Typography } from "@mui/material";
import {
  CenterContainer,
  PageNavigator,
  PageTableBody,
  PageTableHead,
  PageTableProps,
  PageTableSkeleton,
  usePageTable,
  pageTableContainerStyles,
  pageTableStyles,
  pageTableSearchResultMessageStyles,
  tableStyles,
} from "@/components";

export function PageTable<T>(props: PageTableProps<T>) {
  const { handleChangePage, skeletonCells, tableContainerRef } =
    usePageTable(props);

  if (props.isEmpty) {
    return (
      <CenterContainer>
        <Typography variant="subtitle1">{props.textEmptyState}</Typography>
      </CenterContainer>
    );
  }

  return (
    <Stack {...pageTableStyles}>
      {props.hasSearch && !props.isLoading && (
        <Typography {...pageTableSearchResultMessageStyles}>
          {props.searchResultMessage}
        </Typography>
      )}
      <TableContainer ref={tableContainerRef} {...pageTableContainerStyles}>
        <Table {...tableStyles}>
          <PageTableHead renderRow={props.renderRow} />

          {props.isLoading && (
            <PageTableSkeleton skeletonCells={skeletonCells} />
          )}

          {!props.isLoading && (
            <PageTableBody
              items={props.items}
              renderRow={props.renderRow}
              selectedRowId={props.selectedRowId}
              onClickRow={props.onClickRow}
            />
          )}
        </Table>
      </TableContainer>

      <PageNavigator
        pagination={props.pagination}
        meta={props.meta}
        disabled={props.isLoading}
        onChange={handleChangePage}
      />
    </Stack>
  );
}
