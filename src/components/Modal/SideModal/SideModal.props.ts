import { PropsWithChildren } from "react";

export type SideModalProps = PropsWithChildren<{
  open: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  onClose: () => void;
}>;
