import { QueryKey } from "@/enums/QueryKey";
import { ProviderFilter, getAllProviders } from "@/services/providerService";
import { BaseQueryParams, useBaseQuery } from "./useBaseQuery";

export function useProvidersQuery(props?: BaseQueryParams<ProviderFilter>) {
  return useBaseQuery({
    queryKey: QueryKey.PROVIDERS,
    queryFn: getAllProviders,
    ...props,
  });
}
