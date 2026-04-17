import { QueryKey } from "@/enums/QueryKey";
import { getNotifications } from "@/services/notificationService/notificationService";
import { NotificationFilter } from "@/services/notificationService/notificationService.type";
import {
  BaseInfiniteQueryParams,
  useBaseInfiniteQuery,
} from "./useBaseInfiniteQuery";

export function useNotificationsQuery(
  props?: BaseInfiniteQueryParams<NotificationFilter>,
) {
  return useBaseInfiniteQuery({
    queryKey: QueryKey.NOTIFICATIONS,
    queryFn: getNotifications,
    ...props,
  });
}
