import { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import { InputTextProps } from "@/components";

export function InputText({ onChangeValue, ...props }: InputTextProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props?.disabled) return;
    onChangeValue?.(event.target.value);
  };

  return <TextField {...props} onChange={handleChange} fullWidth />;
}
