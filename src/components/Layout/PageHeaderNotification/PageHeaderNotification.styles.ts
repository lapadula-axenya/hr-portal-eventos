import {
  BadgeProps,
  StackProps,
  SxProps,
  TypographyProps,
} from "@mui/material";
import { LucideProps } from "lucide-react";
import { theme } from "@/theme";
import { OverflowBoxProps } from "../OverflowBox";

export const pageHeaderNotificationBellStyles: LucideProps = {
  color: theme.palette.grey[100],
};

export const pageHeaderNotificationBellBadgeStyles: BadgeProps = {
  overlap: "circular",
  variant: "dot",
  color: "error",
  sx: {
    "& .MuiBadge-badge": {
      borderRadius: "50%",
      transform: "scale(0.6) translate(30%, -30%)",
    },
  },
};

export const pageHeaderNotificationModalStyles: SxProps = {
  ".MuiPaper-root": {
    maxHeight: 500,
    width: 450,
  },
  ".MuiList-root": {
    padding: 0,
  },
};

export const pageHeaderNotificationModalHeaderStyles: StackProps = {
  padding: 1,
  paddingTop: 1.25,
  paddingBottom: 0.625,
  borderBottom: `1px solid ${theme.palette.grey[700]}`,
};

export const pageHeaderNotificationModalTitleStyles: TypographyProps = {
  variant: "h6",
  fontWeight: 700,
  color: "grey.100",
};

export const pageHeaderNotificationModalContainerStyles: StackProps = {
  padding: 0.5,
};

export const pageHeaderNotificationModalOverflowStyles: OverflowBoxProps = {
  maxHeight: "415px",
  sx: {
    paddingTop: "0 !important",
  },
};

export const pageHeaderNotificationModalListStyles: StackProps = {
  spacing: 1,
};

export const pageHeaderNotificationModalRefStyles: StackProps = {
  margin: "0 !important",
};

export const pageHeaderNotificationModalButtonStyles: StackProps = {
  paddingTop: 1,
};

export const pageHeaderNotificationModalEmptyStyles: TypographyProps = {
  padding: 0.5,
  color: "grey.100",
};
