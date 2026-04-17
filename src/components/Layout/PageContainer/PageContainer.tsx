import { Stack, Typography } from "@mui/material";
import {
  LoadingContainer,
  PageContainerProps,
  PageHeader,
  pageContainerHeaderSlotStyles,
  pageContainerHeaderStyles,
  pageContainerLoadingStyles,
  pageContainerMainAppendSlotStyles,
  pageContainerMainStyles,
  pageContainerTitleStyles,
} from "@/components";

export function PageContainer(props: PageContainerProps) {
  return (
    <>
      <Stack {...pageContainerHeaderStyles}>
        <Typography {...pageContainerTitleStyles}>{props.title}</Typography>
        <PageHeader />
      </Stack>

      {props.isLoading && <LoadingContainer {...pageContainerLoadingStyles} />}

      {!props.isLoading && props.appendSlot && (
        <Stack {...pageContainerMainAppendSlotStyles(props.appendSlotHeight)}>
          {props.appendSlot}
        </Stack>
      )}

      {!props.isLoading && props.headerSlot && (
        <Stack {...pageContainerHeaderSlotStyles}>{props.headerSlot}</Stack>
      )}

      {!props.isLoading && props.children && (
        <Stack
          {...pageContainerMainStyles(
            !!props.headerSlot,
            !!props.appendSlot,
            props.appendSlotHeight,
          )}
        >
          {props.children}
        </Stack>
      )}
    </>
  );
}
