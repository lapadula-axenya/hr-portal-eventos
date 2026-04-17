import { TextFieldProps } from "@mui/material";

export type InputTextProps = TextFieldProps & {
  onChangeValue?: (value: string) => void;
};
