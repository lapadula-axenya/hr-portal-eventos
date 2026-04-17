import { IconButton, Badge, Menu, Stack, Typography } from "@mui/material";
import { BellIcon } from "lucide-react";
import {
  LoadingButton,
  OverflowBox,
  PageHeaderFileProcessingSummary,
  pageHeaderNotificationBellBadgeStyles,
  pageHeaderNotificationBellStyles,
  PageHeaderNotificationItem,
  pageHeaderNotificationModalButtonStyles,
  pageHeaderNotificationModalContainerStyles,
  pageHeaderNotificationModalEmptyStyles,
  pageHeaderNotificationModalHeaderStyles,
  pageHeaderNotificationModalListStyles,
  pageHeaderNotificationModalOverflowStyles,
  pageHeaderNotificationModalRefStyles,
  pageHeaderNotificationModalStyles,
  pageHeaderNotificationModalTitleStyles,
  usePageHeaderNotification,
} from "@/components";

export function PageHeaderNotification() {
  const {
    anchorEl,
    beneficiaryMovementFile,
    handleClick,
    handleClose,
    handleFetchNextPage,
    hasNotificationsNextPage,
    isNotificationsLoading,
    notifications,
    open,
    resetBeneficiaryMovementFile,
    sentinelRef,
    setBeneficiaryMovementFile,
    unreadNotificationCount,
  } = usePageHeaderNotification();

  if (isNotificationsLoading) return <></>;

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge
          {...pageHeaderNotificationBellBadgeStyles}
          badgeContent={unreadNotificationCount}
        >
          <BellIcon {...pageHeaderNotificationBellStyles} />
        </Badge>
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={pageHeaderNotificationModalStyles}
      >
        <Stack {...pageHeaderNotificationModalHeaderStyles}>
          <Typography {...pageHeaderNotificationModalTitleStyles}>
            Notificações
          </Typography>
        </Stack>

        <Stack {...pageHeaderNotificationModalContainerStyles}>
          <OverflowBox {...pageHeaderNotificationModalOverflowStyles}>
            <Stack {...pageHeaderNotificationModalListStyles}>
              {notifications.map((item) => (
                <PageHeaderNotificationItem
                  key={item.id}
                  notification={item}
                  onClick={setBeneficiaryMovementFile}
                />
              ))}
              <Stack
                ref={sentinelRef}
                {...pageHeaderNotificationModalRefStyles}
              />
            </Stack>

            {hasNotificationsNextPage && (
              <Stack {...pageHeaderNotificationModalButtonStyles}>
                <LoadingButton onClick={handleFetchNextPage} variant="text">
                  Carregar mais
                </LoadingButton>
              </Stack>
            )}

            {!notifications.length && (
              <Typography {...pageHeaderNotificationModalEmptyStyles}>
                Você não possui notificações.
              </Typography>
            )}
          </OverflowBox>
        </Stack>
      </Menu>

      {beneficiaryMovementFile && (
        <PageHeaderFileProcessingSummary
          open
          beneficiaryMovementFile={beneficiaryMovementFile}
          onClose={resetBeneficiaryMovementFile}
        />
      )}
    </>
  );
}
