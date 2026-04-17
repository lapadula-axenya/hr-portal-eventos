import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { QueryKey } from "@/enums/QueryKey";
import { getTicketTimeline } from "@/services/ticketService";

export function useTicketTimelineQuery(ticketId: string) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [
      QueryKey.TICKET_TIMELINE,
      authQueryKey,
      companyQueryKey,
      ticketId,
    ],
    queryFn: () => getTicketTimeline(ticketId),
    enabled: isCompanyReady && !!ticketId,
  });

  const ticketTimeline = data ?? [];
  const isEmpty = !ticketTimeline.length && !isLoading;

  return {
    ticketTimeline: data ?? [],
    isTicketTimelineEmpty: isEmpty,
    isTicketTimelineError: isError,
    isTicketTimelineLoading: isLoading,
  };
}
