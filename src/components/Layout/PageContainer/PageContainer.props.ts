import { PropsWithChildren, ReactNode } from "react";

export type AppendSlotHeight = { xs: string; md: string };

export type PageContainerProps = PropsWithChildren<{
  title: string;
  headerSlot?: ReactNode;
  appendSlot?: ReactNode;
  appendSlotHeight?: AppendSlotHeight;
  isLoading?: boolean;
}>;
