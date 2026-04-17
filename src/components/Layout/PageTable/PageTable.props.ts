import { PageNavigatorProps, PageTableBodyProps } from "@/components";

export type PageTableProps<T> = PageTableBodyProps<T> &
  PageNavigatorProps & {
    isLoading?: boolean;
    isEmpty: boolean;
    textEmptyState: string;
    hasSearch?: boolean;
    searchResultMessage?: string;
    onChangePage?: () => void;
  };
