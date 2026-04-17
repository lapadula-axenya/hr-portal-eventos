import { Stack, StackProps } from "@mui/material";
import { centerContainerStyles } from "@/components";

export function CenterContainer(props: StackProps) {
  return <Stack {...centerContainerStyles} {...props} />;
}
