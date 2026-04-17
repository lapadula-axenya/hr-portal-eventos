import { Snackbar, SnackbarProps } from "@mui/material";
import { actionSnackbarContainerStyles } from "@/components";

export function ActionSnackbar(props: SnackbarProps) {
  return (
    <Snackbar
      open={props.open}
      message={props.open ? props.message : ""}
      action={props.action}
      {...actionSnackbarContainerStyles}
    />
  );
}
