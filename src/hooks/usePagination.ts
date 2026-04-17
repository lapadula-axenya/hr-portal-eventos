import { useCallback, useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);

  const changePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  return { page, changePage };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
