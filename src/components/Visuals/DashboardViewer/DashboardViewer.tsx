import { Stack } from "@mui/material";
import {
  DashboardViewerProps,
  dashboardViewerContainerStyles,
} from "@/components";

export function DashboardViewer(props: DashboardViewerProps) {
  return (
    <Stack
      src={props.url}
      component="iframe"
      sx={dashboardViewerContainerStyles}
      sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      allowFullScreen
    />
  );
}
