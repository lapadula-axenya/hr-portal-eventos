import { StackProps, TypographyProps } from "@mui/material";

export const statusBadgeContainerStyles: StackProps = {
  direction: "row",
  bgcolor: "grey.700",
  borderRadius: "16px",
  height: "max-content",
  width: "max-content",
  padding: "2px 8px",
  spacing: "4px",
  alignItems: "center",
};

export const statusBadgeLabelStyles: TypographyProps = {
  variant: "caption",
  color: "grey.100",
};
