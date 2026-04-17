import { SelectOption } from "../InputSelect";

export type CheckboxListProps = {
  options: SelectOption[];
  disabled?: boolean;
  selecteds: string[];
  onChange: (selecteds: string[]) => void;
};
