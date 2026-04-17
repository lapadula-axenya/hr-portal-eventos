import { Dialog, IconButton, Stack, Typography } from "@mui/material";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import {
  BaseModalProps,
  OverflowBox,
  baseModalCloseButtonIconStyles,
  baseModalCloseButtonStyles,
  baseModalContainerStyles,
  baseModalContentStyles,
  baseModalHeaderStyles,
  baseModalMainStyles,
  baseModalSubtitleStyles,
  baseModalTitleStyles,
} from "@/components";
import { StyleVariant } from "@/enums/StyleVariant";
import { theme } from "@/theme";

export function BaseModal(props: BaseModalProps) {
  const isDanger = props.type === StyleVariant.DANGER;

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      sx={baseModalContainerStyles(props?.small, isDanger, props?.big)}
    >
      <Stack {...baseModalHeaderStyles(props?.small, isDanger)}>
        <Stack direction="row" alignItems="center" spacing="4px">
          {props?.onReturn && (
            <Stack>
              <IconButton onClick={props.onReturn}>
                <ArrowLeftIcon size={18} color={theme.palette.grey[100]} />
              </IconButton>
            </Stack>
          )}
          {props?.title && (
            <Typography {...baseModalTitleStyles}>{props?.title}</Typography>
          )}
        </Stack>
        {props?.subtitle && (
          <Typography {...baseModalSubtitleStyles}>{props.subtitle}</Typography>
        )}
      </Stack>

      {!props?.small && !isDanger && (
        <IconButton {...baseModalCloseButtonStyles} onClick={props.onClose}>
          <XIcon {...baseModalCloseButtonIconStyles} />
        </IconButton>
      )}

      <Stack {...baseModalMainStyles(isDanger)}>
        <OverflowBox {...baseModalContentStyles}>{props?.children}</OverflowBox>
      </Stack>
    </Dialog>
  );
}
