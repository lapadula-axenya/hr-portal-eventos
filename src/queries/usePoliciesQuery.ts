import { QueryKey } from "@/enums/QueryKey";
import { getAllPolicies, PolicyFilter } from "@/services/policyService";
import { BaseQueryParams, useBaseQuery } from "./useBaseQuery";

export function usePolicicesQuery(props?: BaseQueryParams<PolicyFilter>) {
  return useBaseQuery({
    queryKey: QueryKey.POLICIES,
    queryFn: getAllPolicies,
    ...props,
  });
}
