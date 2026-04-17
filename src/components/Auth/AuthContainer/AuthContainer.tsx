import { PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import { authContainerContentStyles, authContainerStyles } from "@/components";

export function AuthContainer({ children }: PropsWithChildren) {
  return (
    <Stack {...authContainerStyles}>
      <Stack {...authContainerContentStyles}>{children}</Stack>
    </Stack>
  );
}
