import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { QueryKey } from "@/enums/QueryKey";
import { getAllCompanies } from "@/services/companyService";

export function useCompaniesQuery() {
  const { authQueryKey } = useAuthContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [QueryKey.COMPANIES, authQueryKey],
    queryFn: getAllCompanies,
  });

  const companies = data ?? [];
  const isEmpty = !companies.length && !isLoading;

  return {
    companies: data ?? [],
    isCompaniesEmpty: isEmpty,
    isCompaniesError: isError,
    isCompaniesLoading: isLoading,
  };
}
