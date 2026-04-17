import { PageTableBodyProps } from "@/components";

export type PageTableHeadProps<T> = Pick<PageTableBodyProps<T>, "renderRow">;
