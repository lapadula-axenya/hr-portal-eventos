import { InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "lucide-react";
import { InputDebounceProps, useInputDebounce } from "@/components";
import { theme } from "@/theme";

export function InputDebounce({
  debounceTimeout,
  onDebounce,
  ...props
}: InputDebounceProps) {
  const { handleChange } = useInputDebounce({
    debounceTimeout,
    onDebounce,
  });

  return (
    <TextField
      {...props}
      onChange={handleChange}
      autoComplete="off"
      sx={{
        ...props.sx,
        ...(!props?.label && {
          padding: 0,
        }),
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon size={16} color={theme.palette.grey[300]} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
