import { Box, Button } from "@mui/material";
import {
  ActionButtonsProps,
  LoadingButton,
  actionButtonsContainerStyles,
} from "@/components";
import { StyleVariant } from "@/enums/StyleVariant";

export function ActionButtons(props: ActionButtonsProps) {
  const isDanger = props.type === StyleVariant.DANGER;
  const colorPrimaryButton = isDanger ? "error" : "primary";
  const colorSecondaryButton = isDanger ? "inherit" : "primary";
  const variantSecondaryButton = isDanger ? "contained" : "text";

  return (
    <Box {...actionButtonsContainerStyles}>
      {props?.onClickSecondaryButton && (
        <Button
          sx={{ mr: 1 }}
          variant={variantSecondaryButton}
          color={colorSecondaryButton}
          disabled={props?.disabled || props?.loading}
          onClick={props.onClickSecondaryButton}
        >
          {props?.secondaryButtonLabel ?? "Cancelar"}
        </Button>
      )}

      <LoadingButton
        disabled={props?.disabled || props?.disabledPrimaryButton}
        loading={props?.loading}
        color={colorPrimaryButton}
        type={props?.onClickPrimaryButton ? "button" : "submit"}
        {...(props?.onClickPrimaryButton && {
          onClick: props.onClickPrimaryButton,
        })}
      >
        {props?.primaryButtonLabel ?? "Salvar"}
      </LoadingButton>
    </Box>
  );
}
