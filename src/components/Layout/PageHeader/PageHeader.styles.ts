import {
  ButtonBaseProps,
  SkeletonProps,
  StackProps,
  TypographyProps,
} from "@mui/material";
import { LucideProps } from "lucide-react";
import { theme } from "@/theme";

export const pageHeaderContainerStyles: StackProps = {
  direction: "row",
  alignItems: "center",
  spacing: 1,
};

export const pageHeaderMenuButtonStyles: ButtonBaseProps = {
  sx: {
    padding: 0.5,
    display: "flex",
    alignItems: "start",
  },
};

export const pageHeaderLabelStyles: StackProps = {
  marginRight: 1.3,
  alignItems: "start",
  width: "200px",
};

export const pageHeaderUserNameStyles: TypographyProps = {
  color: "grey.100",
};

export const pageHeaderUserCompanyNameStyles: TypographyProps = {
  variant: "caption",
  color: "grey.100",
  textAlign: "left",
};

export const pageHeaderUserNameSkeletonStyles: SkeletonProps = {
  width: "100px",
  height: "25px",
};

export const pageHeaderUserCompanySkeletonNameStyles: SkeletonProps = {
  width: "50px",
  height: "16px",
};

export const pageHeaderMenuButtonIconStyles: LucideProps = {
  color: theme.palette.grey[300],
};

export const pageHeaderCenterContainerStyles: StackProps = {
  minHeight: 100,
  spacing: 1,
};
