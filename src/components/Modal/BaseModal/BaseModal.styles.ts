import {
  IconButtonProps,
  StackProps,
  SxProps,
  TypographyProps,
} from "@mui/material";
import { LucideProps } from "lucide-react";
import { OverflowBoxProps } from "@/components";
import { theme } from "@/theme";

export const baseModalContainerStyles = (
  small?: boolean,
  isDanger?: boolean,
  big?: boolean,
): SxProps => ({
  ".MuiPaper-root.MuiDialog-paper": {
    padding: !isDanger ? "30px 25px 35px" : 0,
    position: "relative",
    ...(small && { maxWidth: 420 }),
    ...(isDanger && { maxWidth: 540 }),
    ...(big && { maxWidth: 900 }),
  },
});

export const baseModalHeaderStyles = (
  small?: boolean,
  isDanger?: boolean,
): StackProps => ({
  marginBottom: small ? 0.75 : 1.5,
  color: "grey.100",
  ...(isDanger && {
    marginBottom: 0,
    padding: "15px 30px",
    bgcolor: "error.main",
    color: "white",
  }),
});

export const baseModalTitleStyles: TypographyProps = {
  variant: "h6",
  fontWeight: 700,
};

export const baseModalSubtitleStyles: TypographyProps = {
  variant: "caption",
};

export const baseModalCloseButtonStyles: IconButtonProps = {
  sx: {
    position: "absolute",
    top: 8,
    right: 8,
  },
};

export const baseModalCloseButtonIconStyles: LucideProps = {
  size: 18,
  color: theme.palette.grey[300],
};

export const baseModalMainStyles = (isDanger?: boolean): StackProps => ({
  ...(isDanger && {
    padding: "34px 30px",
    bgcolor: "grey.700",
  }),
});

export const baseModalContentStyles: OverflowBoxProps = {
  maxHeight: "600px",
};
