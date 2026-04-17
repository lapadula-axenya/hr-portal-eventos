import { Stack, Typography } from "@mui/material";
import {
  DetailItemProps,
  detailItemLabelStyles,
  detailItemValueStyles,
} from "@/components";

export function DetailItem(props: DetailItemProps) {
  return (
    <Stack>
      <Typography {...detailItemLabelStyles}>{props.label}</Typography>
      <Typography {...detailItemValueStyles}>{props?.value ?? "-"}</Typography>
    </Stack>
  );
}
