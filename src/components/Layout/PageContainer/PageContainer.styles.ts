import { StackProps, TypographyProps } from "@mui/material";
import { AppendSlotHeight } from "./PageContainer.props";

const pageContainerHeaderHeight = { xs: "81px", md: "97px" };
const pageContainerHeaderSlotHeight = { xs: "80px", md: "90px" };

export const pageContainerStyles: StackProps = {
  paddingInline: { xs: 1.5, md: 2.5 },
  paddingBottom: { xs: 1, md: 1.5 },
};

export const pageContainerHeaderStyles: StackProps = {
  padding: { xs: "1rem 1.5rem", md: "1.5rem 2.5rem" },
  direction: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1.5,
  width: "100%",
  height: pageContainerHeaderHeight,
  borderBottom: "1px solid",
  borderColor: "grey.700",
};

export const pageContainerTitleStyles: TypographyProps = {
  variant: "h5",
  color: "grey.100",
  fontWeight: 700,
  noWrap: true,
  sx: {
    flex: 1,
    minWidth: 0,
    fontSize: { xs: "1.125rem", md: "1.5rem" },
  },
};

export const pageContainerHeaderSlotStyles: StackProps = {
  component: "header",
  direction: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: { xs: 1.5, md: 2.5 },
  height: pageContainerHeaderSlotHeight,
  gap: 2,
};

const calcContentHeight = (
  size: "xs" | "md",
  hasHeaderSlot: boolean,
  hasAppendSlot: boolean,
  appendSlotHeight?: AppendSlotHeight,
) => {
  const base = pageContainerHeaderHeight[size];
  const headerSlot = pageContainerHeaderSlotHeight[size];
  const appendSlot = appendSlotHeight?.[size]
    ? appendSlotHeight?.[size]
    : pageContainerHeaderSlotHeight[size];

  const parts = [base];

  if (hasHeaderSlot) {
    parts.push(headerSlot);
  }

  if (hasAppendSlot) {
    parts.push(appendSlot);
  }

  return `calc(100vh - (${parts.join(" + ")}))`;
};

const getResponsiveContentHeights = (
  hasHeaderSlot: boolean,
  hasAppendSlot: boolean,
  appendSlotHeight?: AppendSlotHeight,
) => ({
  xs: calcContentHeight("xs", hasHeaderSlot, hasAppendSlot, appendSlotHeight),
  md: calcContentHeight("md", hasHeaderSlot, hasAppendSlot, appendSlotHeight),
});

export const pageContainerMainStyles = (
  hasHeaderSlot: boolean,
  hasAppendSlot: boolean,
  appendSlotHeight?: AppendSlotHeight,
): StackProps => {
  const height = getResponsiveContentHeights(
    hasHeaderSlot,
    hasAppendSlot,
    appendSlotHeight,
  );
  const paddingTop = hasHeaderSlot ? undefined : { xs: 1.5, md: 2.5 };

  return {
    component: "main",
    paddingBottom: { xs: 1, md: 1.5 },
    paddingInline: { xs: 1.5, md: 2.5 },
    height,
    sx: {
      overflowX: "hidden",
      overflowY: "auto",
      transition: "0.3s all",
    },
    ...(paddingTop && { paddingTop }),
  };
};

export const pageContainerLoadingStyles = {
  height: getResponsiveContentHeights(false, false),
};

export const pageContainerMainAppendSlotStyles = (
  appendSlotHeight?: AppendSlotHeight,
): StackProps => ({
  height: appendSlotHeight ? appendSlotHeight : pageContainerHeaderHeight,
  paddingTop: { xs: 1, md: 1.5 },
  paddingInline: { xs: 1.5, md: 2.5 },
});
