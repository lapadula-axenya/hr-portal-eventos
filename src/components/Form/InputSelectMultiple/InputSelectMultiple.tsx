import { useEffect, useRef, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { InputSelectMultipleProps } from "@/components";
import { theme } from "@/theme";

const DEBOUNCE_MS = 700;

export function InputSelectMultiple({
  disabled,
  helperText,
  label,
  onChange,
  onDebounce,
  options,
  placeholder,
  singleSelect = false,
  sx,
  value = [],
}: InputSelectMultipleProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    let newValue = typeof value === "string" ? value.split(",") : value;

    if (singleSelect) {
      const last = newValue[newValue.length - 1];
      newValue = last ? [last] : [];
    }

    setInternalValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    onChange?.(newValue);

    timeoutRef.current = setTimeout(() => {
      onDebounce?.(newValue);
      setOpen(false);
    }, DEBOUNCE_MS);
  };

  return (
    <FormControl fullWidth sx={{ ...(!label && { padding: 0 }), ...sx }}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        multiple
        value={internalValue}
        onChange={handleChange}
        disabled={disabled}
        displayEmpty
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderValue={(selected) => (
          <Stack
            direction="row"
            spacing="0.5rem"
            alignItems="center"
            marginRight="0.5rem"
          >
            <Typography variant="body2">{placeholder}</Typography>
            {!!selected.length && (
              <Stack
                component="span"
                bgcolor={disabled ? "primary.dark" : "primary.main"}
                borderRadius={16}
                minWidth={16}
                height={16}
                justifyContent="center"
                alignItems="center"
                padding="2px"
              >
                <Typography
                  variant="body2"
                  color="primary.dark"
                  fontWeight={700}
                  lineHeight={16}
                >
                  {selected.length}
                </Typography>
              </Stack>
            )}
          </Stack>
        )}
      >
        {!options.length && (
          <MenuItem disabled value="">
            <Typography variant="body2" fontStyle="italic" color="grey.100">
              Sem opções
            </Typography>
          </MenuItem>
        )}
        {options.map((option) => {
          const selected = internalValue.includes(option.value);
          const color = selected
            ? theme.palette.text.primary
            : theme.palette.grey[300];
          const color2 = selected
            ? theme.palette.grey[100]
            : theme.palette.grey[300];

          return (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={selected} sx={{ padding: 0 }} disableRipple />
              <Stack
                direction="row"
                alignItems="center"
                spacing="0.5rem"
                marginLeft={option?.icon ? "20px" : "14px"}
              >
                {option?.icon && (
                  <option.icon color={color} size={20} strokeWidth={2.25} />
                )}
                <Stack>
                  <Typography
                    variant="body2"
                    color={color}
                    {...(option?.subtitle && {
                      lineHeight: 1.2,
                    })}
                  >
                    {option.label}
                  </Typography>
                  {option?.subtitle && (
                    <Typography variant="body2" color={color2} lineHeight={1.2}>
                      {option.subtitle}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </MenuItem>
          );
        })}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
}
