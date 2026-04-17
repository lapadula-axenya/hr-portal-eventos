import { Button } from "@mui/material";
import Link from "next/link";
import { LinkButtonProps } from "@/components";

export function LinkButton({ children, href, ...props }: LinkButtonProps) {
  return (
    <Button href={href} LinkComponent={Link} {...props}>
      {children}
    </Button>
  );
}
