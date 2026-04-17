import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import { capitalizeFirst } from "@/utils/capitalizeFirst";

export type BaseItemQueryParams = {
  entityId: string;
  enabled?: boolean;
};

export type BaseItemQueryProps<Entity, Key> = BaseItemQueryParams & {
  queryKey: Key;
  queryFn: (entityId: string) => Promise<Entity>;
};

export function useBaseItemQuery<Entity, Key extends string>({
  enabled = true,
  entityId,
  queryFn,
  queryKey,
}: BaseItemQueryProps<Entity, Key>) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [queryKey, authQueryKey, companyQueryKey, entityId],
    queryFn: () => queryFn(entityId),
    enabled: isCompanyReady && !!enabled && !!entityId,
  });

  const keyCap = capitalizeFirst(queryKey);

  return {
    [queryKey]: data,
    [`is${keyCap}Error`]: isError,
    [`is${keyCap}Loading`]: isLoading,
  } as {
    [K in Key]: Entity;
  } & {
    [K in `is${Capitalize<Key>}Error`]: boolean;
  } & {
    [K in `is${Capitalize<Key>}Loading`]: boolean;
  };
}
