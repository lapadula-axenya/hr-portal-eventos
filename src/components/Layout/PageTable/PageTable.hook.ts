import { useCallback, useMemo } from "react";
import { PageTableProps } from "@/components";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export function usePageTable<T>(props: PageTableProps<T>) {
  const { containerRef, scrollToTop } = useScrollToTop();

  const skeletonCells = useMemo(() => props.renderRow().length, [props]);

  const handleChangePage = useCallback(() => {
    scrollToTop();
    props?.onChangePage?.();
  }, [props, scrollToTop]);

  return {
    tableContainerRef: containerRef,
    skeletonCells,
    handleChangePage,
  };
}
