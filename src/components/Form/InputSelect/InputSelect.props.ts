import { SelectProps } from "@mui/material";
import { LucideIcon } from "lucide-react";

export type SelectOption = {
  label?: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
};

export type InputSelectProps = SelectProps & {
  value?: string;
  options: SelectOption[];
  helperText?: string;
  noBorder?: boolean;
  placeholder?: string;
  onChangeValue: (value: string) => void;
};
