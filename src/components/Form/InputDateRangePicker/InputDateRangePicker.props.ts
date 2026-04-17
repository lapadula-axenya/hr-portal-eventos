import { SxProps } from "@mui/material";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { Dayjs } from "dayjs";

export type InputDateRangePickerProps = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  label?: string;
  sx?: SxProps;
  disabled?: boolean;
  onChangeStartDate: (value: PickerValue) => void;
  onChangeEndDate: (value: PickerValue) => void;
};
