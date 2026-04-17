import { PropsWithChildren } from "react";
import { StyleVariant } from "@/enums/StyleVariant";

export type BaseModalProps = PropsWithChildren<{
  open: boolean;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  onReturn?: () => void;
  small?: boolean;
  big?: boolean;
  type?: StyleVariant;
}>;
