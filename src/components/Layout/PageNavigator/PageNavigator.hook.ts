import { ChangeEvent, useCallback, useMemo } from "react";
import { PageNavigatorProps } from "@/components";

export function usePageNavigator(props: PageNavigatorProps) {
  const totalPages = useMemo(
    () => props.meta?.totalPages ?? 1,
    [props.meta?.totalPages],
  );

  const disabled = useMemo(
    () => props.disabled || totalPages <= 1,
    [props.disabled, totalPages],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<unknown>, newPage: number) => {
      props.pagination.changePage(event, newPage);
      props?.onChange?.();
    },
    [props],
  );

  return {
    totalPages,
    disabled,
    handleChange,
  };
}
