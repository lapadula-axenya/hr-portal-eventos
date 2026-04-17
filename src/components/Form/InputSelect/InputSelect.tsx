import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { InputSelectProps } from "@/components";

export function InputSelect({
  helperText,
  label,
  noBorder = false,
  onChangeValue,
  options,
  value,
  ...props
}: InputSelectProps) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChangeValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth sx={{ ...(!label && { padding: 0 }) }}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        {...props}
        value={value}
        onChange={handleChange}
        sx={{
          ...(noBorder && {
            border: 0,
            ".MuiSelect-select": {
              color: "grey.100",
            },
            svg: {
              color: "grey.100",
            },
          }),
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
}
