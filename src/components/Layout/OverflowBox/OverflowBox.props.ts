import { PropsWithChildren, RefObject } from "react";
import { SxProps, Theme } from "@mui/material";

export type OverflowBoxProps = PropsWithChildren<{
  maxHeight?: string;
  spacing?: string;
  sx?: SxProps<Theme>;
  ref?: RefObject<HTMLDivElement | null>;
}>;
