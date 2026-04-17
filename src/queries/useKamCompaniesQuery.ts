import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { QueryKey } from "@/enums/QueryKey";
import { getCompanies, CompanyWithMeta } from "@/services/companyService";

const EMPTY_COMPANIES: CompanyWithMeta[] = [];

export function useKamCompaniesQuery(enabled = true) {
  const { authQueryKey } = useAuthContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [QueryKey.KAM_COMPANIES, ...authQueryKey],
    queryFn: getCompanies,
    enabled,
  });

  return {
    companies: data ?? EMPTY_COMPANIES,
    isCompaniesError: isError,
    isCompaniesLoading: isLoading,
  };
}
