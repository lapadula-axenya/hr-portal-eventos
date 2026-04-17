import { Button, ButtonProps, CircularProgress, Stack } from "@mui/material";
import {
  loadingButtonLabelStyles,
  loadingButtonSpinnerContainerStyles,
} from "@/components";

export function LoadingButton(props: ButtonProps) {
  const { children, disabled, loading, onClick, ...buttonProps } = props;

  return (
    <Button onClick={onClick} disabled={disabled || !!loading} {...buttonProps}>
      {loading && (
        <Stack {...loadingButtonSpinnerContainerStyles}>
          <CircularProgress size={16} />
        </Stack>
      )}

      <Stack {...loadingButtonLabelStyles(!!loading)}>{children}</Stack>
    </Button>
  );
}
