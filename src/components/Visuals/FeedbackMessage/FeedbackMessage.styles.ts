import { StackProps } from "@mui/material";
import { LucideProps } from "lucide-react";
import { theme } from "@/theme";

export const feedbackMessageContainerStyles: StackProps = {
  width: 523,
  alignItems: "center",
};

export const feedbackMessageIconStyles: LucideProps = {
  size: 80,
  color: theme.palette.primary.main,
  style: {
    marginBottom: 32,
  },
};

export const feedbackMessageHeaderStyles: StackProps = {
  width: 270,
  marginInline: "auto",
  marginBottom: 3,
};
