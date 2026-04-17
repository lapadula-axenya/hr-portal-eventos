import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { QueryKey } from "@/enums/QueryKey";
import { getTicketByBenefitCardId } from "@/services/ticketService";

export function useTicketByBenefitCardQuery(benefitCardId: string) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [
      QueryKey.TICKET_BENEFIT_CARD,
      authQueryKey,
      companyQueryKey,
      benefitCardId,
    ],
    queryFn: () => getTicketByBenefitCardId(benefitCardId),
    enabled: isCompanyReady && !!benefitCardId,
  });

  const ticketByBenefitCard = data ?? [];
  const isEmpty = !ticketByBenefitCard.length && !isLoading;

  return {
    tickets: data ?? [],
    isTicketsEmpty: isEmpty,
    isTicketsError: isError,
    isTicketsLoading: isLoading,
  };
}
