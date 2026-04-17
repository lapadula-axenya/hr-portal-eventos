import { SxProps } from "@mui/material";
import { SelectOption } from "@/components";

export type InputSelectMultipleProps = {
  value?: string[];
  label?: string;
  placeholder?: string;
  singleSelect?: boolean;
  options: SelectOption[];
  helperText?: string;
  disabled?: boolean;
  sx?: SxProps;
  onChange?: (value: string[]) => void;
  onDebounce?: (value: string[]) => void;
};
