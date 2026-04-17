import { StyleVariant } from "@/enums/StyleVariant";

export type ActionButtonsProps = {
  loading?: boolean;
  disabled?: boolean;
  disabledPrimaryButton?: boolean;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
  type?: StyleVariant;
};
