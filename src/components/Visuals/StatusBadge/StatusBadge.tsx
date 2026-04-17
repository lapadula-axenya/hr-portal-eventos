import { Stack, Typography } from "@mui/material";
import {
  StatusBadgeProps,
  StatusDot,
  statusBadgeContainerStyles,
  statusBadgeLabelStyles,
} from "@/components";

export function StatusBadge({ color, label }: StatusBadgeProps) {
  return (
    <Stack {...statusBadgeContainerStyles}>
      <StatusDot color={color} size={6} />
      <Typography {...statusBadgeLabelStyles}>{label}</Typography>
    </Stack>
  );
}
