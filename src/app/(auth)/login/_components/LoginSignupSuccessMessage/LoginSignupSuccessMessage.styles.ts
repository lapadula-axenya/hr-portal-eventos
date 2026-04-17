import { CardProps, StackProps } from "@mui/material";
import { LucideProps } from "lucide-react";
import { theme } from "@/theme";

export const loginSignupSuccessMessageStyles: CardProps = {
  sx: {
    marginBottom: 1,
    bgcolor: "grey.700",
  },
};

export const loginSignupSuccessMessageContentStyles: StackProps = {
  direction: "row",
  justifyContent: "center",
  alignItems: "center",
  spacing: 1,
};

export const loginSignupSuccessMessageIconStyles: LucideProps = {
  size: 22,
  color: theme.palette.primary.main,
};
