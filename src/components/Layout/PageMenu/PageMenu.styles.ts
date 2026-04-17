import {
  IconButtonProps,
  StackProps,
  SxProps,
  TypographyProps,
} from "@mui/material";
import { LucideProps } from "lucide-react";

export const pageMenuContainerStyles = (isExpanded: boolean): StackProps => ({
  width: isExpanded ? "250px" : "80px",
  height: "100vh",

  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 3,

  padding: "140px 16px 66px",

  bgcolor: "grey.900",
  borderRight: "1px solid",
  borderColor: "grey.700",

  sx: {
    transition: "0.3s all",
  },
});

export const pageMenuLogoStyles: StackProps = {
  position: "fixed",
  top: "32px",
  left: "28px",
};

export const pageMenuNavStyles: StackProps = {
  component: "nav",
  spacing: "24px",
};

export const pageMenuNavItemStyles = (isActive: boolean): SxProps => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
  borderRadius: "8px",
  padding: "12px",
  textDecoration: "none",
  transition: "0.3s all",
  div: {
    color: "grey.300",
    transition: "0.3s all",
  },
  ":hover": {
    bgcolor: "grey.800",
    div: {
      color: "primary.main",
    },
  },
  ...(isActive && {
    bgcolor: "primary.dark",
    div: {
      color: "primary.main",
    },
  }),
});

export const pageMenuNavItemLabelStyles: TypographyProps = {
  variant: "subtitle2",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  color: "white",
  display: "flex",
  alignItems: "center",
};

export const pageMenuButtonCollapseContainerStyles: StackProps = {
  position: "fixed",
  left: "16px",
  bottom: "16px",
  width: "48px",
  alignItems: "center",
};

export const pageMenuButtonCollapseStyles: IconButtonProps = {
  sx: {
    width: 30,
    height: 30,
    bgcolor: "grey.800",
  },
};

export const pageMenuButtonCollapseIconStyles = (
  isExpanded: boolean,
): LucideProps => ({
  size: 20,
  style: {
    transition: "0.3s all",
    transform: `rotate(${isExpanded ? 180 : 0}deg)`,
  },
});

export const pageMenuButtonCollapseIconPinStyles = (
  isExpandedPinned: boolean,
): LucideProps => ({
  size: 16,
  style: {
    transition: "0.3s all",
    transform: `rotate(${isExpandedPinned ? 45 : 0}deg)`,
  },
});
