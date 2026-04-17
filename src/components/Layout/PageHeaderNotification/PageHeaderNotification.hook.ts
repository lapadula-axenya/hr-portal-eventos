import { useEffect, useMemo, useRef, useState } from "react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useActionMenu } from "@/components";
import { QueryKey } from "@/enums/QueryKey";
import { useNotificationsQuery } from "@/queries/useNotificationsQuery";
import { markNotificationsAsRead } from "@/services/notificationService/notificationService";
import {
  BeneficiaryMovementFile,
  Notification,
  NotificationContext,
} from "@/services/notificationService/notificationService.type";
import { ApiResponse } from "@/types/apiResponse";
import { FilterOperator } from "@/types/filterOperator";

export function usePageHeaderNotification() {
  const { anchorEl, handleClick, handleClose, open } = useActionMenu();
  const queryClient = useQueryClient();

  const [beneficiaryMovementFile, setBeneficiaryMovementFile] =
    useState<BeneficiaryMovementFile | null>(null);

  const resetBeneficiaryMovementFile = () => {
    setBeneficiaryMovementFile(null);
  };

  const {
    fetchNotificationsNextPage,
    hasNotificationsNextPage,
    isNotificationsLoading,
    notifications,
  } = useNotificationsQuery({
    params: {
      "filter.context": `${FilterOperator.EQ}:${NotificationContext.BENEFICIARY_MOVEMENT_FILE_PROCESS_END}`,
      limit: 3,
    },
  });

  const unreadIds = useMemo(
    () => notifications.filter((item) => !item.isRead).map((item) => item.id),
    [notifications],
  );

  useEffect(() => {
    if (!open || unreadIds.length === 0) return;

    markNotificationsAsRead({ notificationIds: unreadIds });

    queryClient.setQueriesData<InfiniteData<ApiResponse<Notification>>>(
      { queryKey: [QueryKey.NOTIFICATIONS] },
      (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((notification) =>
              unreadIds.includes(notification.id)
                ? { ...notification, isRead: true }
                : notification,
            ),
          })),
        };
      },
    );
  }, [open, unreadIds, queryClient]);

  const unreadNotificationCount = unreadIds.length;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);
  const prevNotificationsLengthRef = useRef(notifications.length);

  useEffect(() => {
    if (
      shouldScrollRef.current &&
      notifications.length > prevNotificationsLengthRef.current
    ) {
      sentinelRef.current?.scrollIntoView({ behavior: "smooth" });
      shouldScrollRef.current = false;
    }
    prevNotificationsLengthRef.current = notifications.length;
  }, [notifications.length]);

  const handleFetchNextPage = () => {
    shouldScrollRef.current = true;
    fetchNotificationsNextPage();
  };

  return {
    anchorEl,
    handleClick,
    handleClose,
    open,
    isNotificationsLoading,
    notifications,
    unreadNotificationCount,
    handleFetchNextPage,
    hasNotificationsNextPage,
    sentinelRef,
    beneficiaryMovementFile,
    resetBeneficiaryMovementFile,
    setBeneficiaryMovementFile,
  };
}
