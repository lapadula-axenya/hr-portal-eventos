import { ChangeEvent } from "react";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import {
  checkboxListContainerStyles,
  checkboxListInputStyles,
  checkboxListLabelAllStyles,
  checkboxListLabelStyles,
  checkboxListOverflowBoxStyles,
  CheckboxListProps,
  OverflowBox,
} from "@/components";

export function CheckboxList({
  disabled,
  onChange,
  options,
  selecteds = [],
}: CheckboxListProps) {
  const isAllSelected = options.length === selecteds.length;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked: isChecked, name: value } = event.target;

    const newSelecteds =
      value === "all"
        ? isChecked
          ? options.map((option) => option.value)
          : []
        : isChecked
          ? [...selecteds, value]
          : selecteds.filter((item) => item !== value);

    onChange(newSelecteds);
  };

  return (
    <FormControl
      disabled={disabled}
      component="fieldset"
      variant="standard"
      sx={checkboxListContainerStyles}
    >
      <FormControlLabel
        control={
          <Checkbox
            name="all"
            checked={isAllSelected}
            onChange={handleChange}
            sx={checkboxListInputStyles}
            disableRipple
          />
        }
        label="Selecionar todos"
        sx={checkboxListLabelAllStyles(isAllSelected)}
      />

      <OverflowBox {...checkboxListOverflowBoxStyles}>
        {options.map((option) => {
          const isChecked = selecteds.includes(option.value);
          return (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  name={option.value}
                  checked={isChecked}
                  onChange={handleChange}
                  sx={checkboxListInputStyles}
                  disableRipple
                />
              }
              label={option.label}
              sx={checkboxListLabelStyles(isChecked)}
            />
          );
        })}
      </OverflowBox>
    </FormControl>
  );
}
