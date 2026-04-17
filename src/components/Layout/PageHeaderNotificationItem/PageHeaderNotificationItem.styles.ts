import { ButtonProps, StackProps, TypographyProps } from "@mui/material";
import { FileNotificationStatus } from "@/services/notificationService/notificationService.type";

export const pageHeaderNotificationItemContainerStyles = (
  isFailed: boolean,
): StackProps => ({
  paddingBlock: 0.75,
  paddingInline: 0.5,
  spacing: 0.5,
  ...(isFailed && {
    borderRadius: "4px",
    border: "1px solid",
    borderColor: "grey.500",
    bgcolor: "grey.700",
  }),
});

export const pageHeaderNotificationItemHeaderStyles: StackProps = {
  justifyContent: "space-between",
  alignItems: "center",
  direction: "row",
};

export const pageHeaderNotificationItemTitleStyles = (
  status: FileNotificationStatus,
): TypographyProps => {
  const color =
    status === FileNotificationStatus.COMPLETED
      ? "success.main"
      : status === FileNotificationStatus.FAILED
        ? "error.main"
        : "grey.100";

  return {
    variant: "overline",
    color,
  };
};

export const pageHeaderNotificationItemDateStyles: TypographyProps = {
  variant: "overline",
  color: "grey.300",
};

export const pageHeaderNotificationItemTextStyles: TypographyProps = {
  variant: "overline",
  sx: { wordBreak: "break-word" },
};

export const pageHeaderNotificationItemButtonStyles: ButtonProps = {
  size: "small",
  sx: {
    marginLeft: "auto",
    width: "max-content",
    height: "24px",
  },
};
