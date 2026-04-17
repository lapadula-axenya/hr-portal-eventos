import { TextFieldProps } from "@mui/material";

export type InputDebounceProps = TextFieldProps & {
  onDebounce: (value: string) => void;
  debounceTimeout?: number;
};
