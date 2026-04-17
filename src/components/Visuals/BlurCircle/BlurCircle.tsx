import { Stack } from "@mui/material";
import { BlurCircleProps, blurCircleStyles } from "@/components";

export function BlurCircle(props: BlurCircleProps) {
  return <Stack {...blurCircleStyles}>{props.children}</Stack>;
}
