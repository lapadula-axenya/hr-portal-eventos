import { useCallback, type Dispatch, type SetStateAction } from "react";

export function useChangeWithResetPage(
  changePage: (path: string, newPage: number) => void,
) {
  const handleChangeWithResetPage = useCallback(
    <T>(setter: Dispatch<SetStateAction<T>>) => {
      return (value: SetStateAction<T>) => {
        setter(value);
        changePage("", 1);
      };
    },
    [changePage],
  );

  return { handleChangeWithResetPage };
}
