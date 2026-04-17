import { Pagination, Stack } from "@mui/material";
import {
  PageNavigatorProps,
  usePageNavigator,
  pageNavigatorContainerStyles,
} from "@/components";

export function PageNavigator(props: PageNavigatorProps) {
  const { disabled, handleChange, totalPages } = usePageNavigator(props);

  return (
    <Stack {...pageNavigatorContainerStyles}>
      <Pagination
        count={totalPages}
        page={props.pagination.page}
        disabled={disabled}
        onChange={handleChange}
      />
    </Stack>
  );
}
