import { QueryKey } from "@/enums/QueryKey";
import { getAllPrincipals, PrincipalFilter } from "@/services/principalService";
import { BaseQueryParams, useBaseQuery } from "./useBaseQuery";

export function usePrincipalsQuery(props?: BaseQueryParams<PrincipalFilter>) {
  return useBaseQuery({
    queryKey: QueryKey.PRINCIPALS,
    queryFn: getAllPrincipals,
    ...props,
  });
}
