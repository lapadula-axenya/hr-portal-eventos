import { QueryKey } from "@/enums/QueryKey";
import { getAllTickets, TicketFilter } from "@/services/ticketService";
import { BaseQueryParams, useBaseQuery } from "./useBaseQuery";

export function useTicketsQuery(props?: BaseQueryParams<TicketFilter>) {
  return useBaseQuery({
    queryKey: QueryKey.TICKETS,
    queryFn: getAllTickets,
    ...props,
  });
}
