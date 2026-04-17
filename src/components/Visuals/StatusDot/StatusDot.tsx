import { Stack } from "@mui/material";
import { StatusDotProps, statusDotContainerStyles } from "@/components";

export function StatusDot({ color, size }: StatusDotProps) {
  return <Stack bgcolor={color} {...statusDotContainerStyles(size)} />;
}
