import { StackProps, TypographyProps } from "@mui/material";
import { LucideProps } from "lucide-react";
import { theme } from "@/theme";

export const passwordRulesContainerStyles: StackProps = {
  spacing: 1,
};

export const passwordRulesItemStyles: StackProps = {
  direction: "row",
  alignItems: "center",
  spacing: 1.5,
};

const iconStyles: LucideProps = {
  size: 16,
  strokeWidth: 3,
};

export const passwordRulesIconValidStyles: LucideProps = {
  color: theme.palette.primary.main,
  ...iconStyles,
};

export const passwordRulesIconInvalidStyles: LucideProps = {
  color: theme.palette.primary.main,
  ...iconStyles,
};

export const passwordRulesLabelStyles = (
  isValid: boolean,
): TypographyProps => ({
  color: isValid ? "primary.main" : "grey.300",
});
