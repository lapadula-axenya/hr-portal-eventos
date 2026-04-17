import { PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import { BrandLogo, authSimpleContainerContainerStyles } from "@/components";

export function AuthSimpleContainer({ children }: PropsWithChildren) {
  return (
    <Stack {...authSimpleContainerContainerStyles}>
      <BrandLogo />
      <Stack>{children}</Stack>
    </Stack>
  );
}
