import { Button, Stack, Typography } from "@mui/material";
import {
  PageHeaderNotificationItemProps,
  pageHeaderNotificationItemButtonStyles,
  pageHeaderNotificationItemContainerStyles,
  pageHeaderNotificationItemDateStyles,
  pageHeaderNotificationItemHeaderStyles,
  pageHeaderNotificationItemTextStyles,
  pageHeaderNotificationItemTitleStyles,
  usePageHeaderNotificationItem,
} from "@/components";

export function PageHeaderNotificationItem({
  notification,
  onClick,
}: PageHeaderNotificationItemProps) {
  const { formattedDate, handleClick, isFailed, message, status, statusLabel } =
    usePageHeaderNotificationItem({
      notification,
      onClick,
    });

  return (
    <Stack {...pageHeaderNotificationItemContainerStyles(isFailed)}>
      <Stack {...pageHeaderNotificationItemHeaderStyles}>
        <Typography {...pageHeaderNotificationItemTitleStyles(status)}>
          {statusLabel}
        </Typography>

        <Typography {...pageHeaderNotificationItemDateStyles}>
          {formattedDate}
        </Typography>
      </Stack>

      <Typography {...pageHeaderNotificationItemTextStyles}>
        {message}
      </Typography>

      {isFailed && (
        <Stack>
          <Button
            onClick={handleClick}
            {...pageHeaderNotificationItemButtonStyles}
          >
            Ver detalhes
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
