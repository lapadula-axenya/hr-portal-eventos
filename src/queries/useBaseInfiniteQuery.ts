import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCompanyContext } from "@/contexts/CompanyContext";
import {
  ApiResponse,
  ApiResponseMeta,
  GetAllParamsDefault,
} from "@/types/apiResponse";
import { capitalizeFirst } from "@/utils/capitalizeFirst";

export type BaseInfiniteQueryParams<Filter> = {
  params?: Omit<GetAllParamsDefault<Filter>, "page">;
  enabled?: boolean;
};

export type BaseInfiniteQueryProps<Entity, Filter, Key> =
  BaseInfiniteQueryParams<Filter> & {
    queryKey: Key;
    queryFn: (
      params?: GetAllParamsDefault<Filter>,
    ) => Promise<ApiResponse<Entity>>;
    queryKeyExtra?: unknown[];
  };

export function useBaseInfiniteQuery<Entity, Filter, Key extends string>({
  enabled = true,
  params,
  queryFn,
  queryKey,
  queryKeyExtra,
}: BaseInfiniteQueryProps<Entity, Filter, Key>) {
  const { authQueryKey } = useAuthContext();
  const { companyQueryKey, isCompanyReady } = useCompanyContext();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      queryKey,
      authQueryKey,
      companyQueryKey,
      params,
      ...(queryKeyExtra ?? []),
    ],
    queryFn: ({ pageParam }) =>
      queryFn({
        ...params,
        page: pageParam as number,
      } as GetAllParamsDefault<Filter>),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<Entity>) => {
      const { currentPage, totalPages } = lastPage.meta;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: isCompanyReady && enabled,
  });

  const entityData = data?.pages.flatMap((page) => page.data) ?? [];
  const lastMeta = data?.pages.at(-1)?.meta;
  const isEmpty = !entityData.length && !isLoading;

  const keyCap = capitalizeFirst(queryKey);

  return {
    [queryKey]: entityData,
    [`${queryKey}Meta`]: lastMeta,
    [`is${keyCap}Empty`]: isEmpty,
    [`is${keyCap}Error`]: isError,
    [`is${keyCap}Loading`]: isLoading,
    [`is${keyCap}FetchingNextPage`]: isFetchingNextPage,
    [`has${keyCap}NextPage`]: hasNextPage,
    [`fetch${keyCap}NextPage`]: fetchNextPage,
  } as unknown as {
    [K in Key]: Entity[];
  } & {
    [K in `${Key}Meta`]: ApiResponseMeta | undefined;
  } & {
    [K in `is${Capitalize<Key>}Empty`]: boolean;
  } & {
    [K in `is${Capitalize<Key>}Error`]: boolean;
  } & {
    [K in `is${Capitalize<Key>}Loading`]: boolean;
  } & {
    [K in `is${Capitalize<Key>}FetchingNextPage`]: boolean;
  } & {
    [K in `has${Capitalize<Key>}NextPage`]: boolean;
  } & {
    [K in `fetch${Capitalize<Key>}NextPage`]: () => void;
  };
}
