import { IconButton, IconButtonProps } from "@mui/material";
import { DownloadIcon } from "lucide-react";
import { mainInvoicesDownloadButtonStyles } from ".";

export function MainInvoicesDownloadButton(props: IconButtonProps) {
  return (
    <IconButton onClick={props.onClick} {...mainInvoicesDownloadButtonStyles}>
      <DownloadIcon size={24} strokeWidth={2.5} />
    </IconButton>
  );
}
