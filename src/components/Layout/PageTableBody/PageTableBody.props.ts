import { ReactNode } from "react";
import { Identifiable } from "@/types/apiResponse";

export type VerticalAlign = "top" | "middle" | "bottom";
export type TitleAlign = "left" | "center" | "right";

export type PageTableBodyRowProps = {
  title: string;
  titleElement?: ReactNode;
  hideTitle?: boolean;
  width?: string;
  content: ReactNode;
  cellVerticalAlign?: VerticalAlign;
  titleAlign?: TitleAlign;
};

export type PageTableBodyProps<T> = {
  items: Identifiable<T>[];
  renderRow: (item?: T) => PageTableBodyRowProps[];
  onClickRow?: (item?: T) => void;
  selectedRowId?: string;
};
