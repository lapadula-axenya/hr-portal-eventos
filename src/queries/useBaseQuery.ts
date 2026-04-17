import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import {
  ApiResponse,
  ApiResponseMeta,
  GetAllParamsDefault,
} from "@/types/apiResponse";
import { capitalizeFirst } from "@/utils/capitalizeFirst";

export type BaseQueryParams<Filter> = {
  params?: GetAllParamsDefault<Filter>;
  enabled?: boolean;
};

export type BaseQueryProps<Entity, Filter, Key> = BaseQueryParams<Filter> & {
  queryKey: Key;
  queryFn: (
    parmas?: GetAllParamsDefault<Filter>,
  ) => Promise<ApiResponse<Entity>>;
};

export function useBaseQuery<Entity, Filter, Key extends string>({
  enabled = true,
  params,
  queryFn,
  queryKey,
}: BaseQueryProps<Entity, Filter, Key>) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: [queryKey, authQueryKey, companyQueryKey, params],
    queryFn: () => queryFn(params),
    enabled: isCompanyReady && enabled,
  });

  const entityData = data?.data ?? [];
  const isEmpty = !entityData.length && !isLoading;

  const keyCap = capitalizeFirst(queryKey);

  return {
    [queryKey]: entityData,
    [`${queryKey}Meta`]: data?.meta,
    [`is${keyCap}Empty`]: isEmpty,
    [`is${keyCap}Error`]: isError,
    [`is${keyCap}Loading`]: isLoading,
  } as {
    [K in Key]: Entity[];
  } & {
    [K in `${Key}Meta`]: ApiResponseMeta | undefined;
  } & {
    [K in `is${Capitalize<Key>}Empty`]: boolean;
  } & {
    [K in `is${Capitalize<Key>}Error`]: boolean;
  } & {
    [K in `is${Capitalize<Key>}Loading`]: boolean;
  };
}
