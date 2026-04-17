import { FormControl, InputLabel, Select, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { CalendarIcon } from "lucide-react";
import { EllipsisText, InputDateRangePickerProps } from "@/components";

const FORMAT_DATE = "D [de] MMM, YYYY";

export function InputDateRangePicker({
  disabled,
  endDate,
  label,
  onChangeEndDate,
  onChangeStartDate,
  startDate,
  sx,
}: InputDateRangePickerProps) {
  const handleChangeStartDate = (value: PickerValue) => {
    onChangeStartDate(value);
    if (endDate && value && endDate.isBefore(value)) {
      onChangeEndDate(null);
    }
  };

  const handleChangeEndDate = (value: PickerValue) => {
    onChangeEndDate(value);
  };

  const placelholder =
    !startDate && !endDate
      ? "Selecione uma data"
      : `${startDate?.format(FORMAT_DATE) ?? "..."} - ${endDate?.format(FORMAT_DATE) ?? "..."}`;

  return (
    <>
      <FormControl fullWidth sx={{ ...(!label && { padding: 0 }), ...sx }}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          disabled={disabled}
          displayEmpty
          sx={{
            ".MuiSelect-select": { padding: "14px !important" },
            ".MuiSvgIcon-root": { display: "none" },
          }}
          renderValue={() => (
            <Stack direction="row" spacing="0.5rem" alignItems="center">
              <Stack color="grey.100">
                <CalendarIcon size={18} strokeWidth={2.5} />
              </Stack>
              <EllipsisText variant="body2" title={placelholder}>
                {placelholder}
              </EllipsisText>
            </Stack>
          )}
        >
          <Stack direction="row" spacing="2rem"></Stack>
          <DatePicker
            label="De"
            value={startDate}
            onChange={handleChangeStartDate}
            sx={{ width: 150, marginRight: "2rem" }}
          />
          <DatePicker
            label="Para"
            value={endDate}
            minDate={startDate || undefined}
            onChange={handleChangeEndDate}
            sx={{ width: 150 }}
          />
        </Select>
      </FormControl>
    </>
  );
}
