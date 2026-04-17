import { Components, Theme } from "@mui/material";
import { MuiAlert } from "./MuiAlert";
import { MuiAutocomplete } from "./MuiAutocomplete";
import { MuiBadge } from "./MuiBadge";
import { MuiButton } from "./MuiButton";
import { MuiButtonBase } from "./MuiButtonBase";
import { MuiCard } from "./MuiCard";
import { MuiCardContent } from "./MuiCardContent";
import { MuiCheckbox } from "./MuiCheckbox";
import { MuiChip } from "./MuiChip";
import { MuiDialog } from "./MuiDialog";
import { MuiFormControl } from "./MuiFormControl";
import { MuiFormHelperText } from "./MuiFormHelperText";
import { MuiIconButton } from "./MuiIconButton";
import { MuiInputBase } from "./MuiInputBase";
import { MuiInputLabel } from "./MuiInputLabel";
import { MuiMenu } from "./MuiMenu";
import { MuiMenuItem } from "./MuiMenuItem";
import { MuiOutlinedInput } from "./MuiOutlinedInput";
import { MuiPagination } from "./MuiPagination";
import { MuiPaper } from "./MuiPaper";
import { MuiSelect } from "./MuiSelect";
import { MuiSwitch } from "./MuiSwitch";
import { MuiTable } from "./MuiTable";
import { MuiTableCell } from "./MuiTableCell";
import { MuiTableContainer } from "./MuiTableContainer";
import { MuiTooltip } from "./MuiTooltip";

export const components: Components<Omit<Theme, "components">> = {
  ...MuiAlert,
  ...MuiAutocomplete,
  ...MuiBadge,
  ...MuiButton,
  ...MuiButtonBase,
  ...MuiCard,
  ...MuiCardContent,
  ...MuiCheckbox,
  ...MuiChip,
  ...MuiDialog,
  ...MuiFormControl,
  ...MuiFormHelperText,
  ...MuiIconButton,
  ...MuiInputBase,
  ...MuiInputLabel,
  ...MuiMenu,
  ...MuiSelect,
  ...MuiMenuItem,
  ...MuiOutlinedInput,
  ...MuiPagination,
  ...MuiPaper,
  ...MuiSwitch,
  ...MuiTable,
  ...MuiTableCell,
  ...MuiTableContainer,
  ...MuiTooltip,
};
