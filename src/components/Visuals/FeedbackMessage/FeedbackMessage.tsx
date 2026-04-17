import { Stack } from "@mui/material";
import {
  HeroHeader,
  HeroHeaderProps,
  LinkButton,
  FeedbackMessageProps,
  feedbackMessageContainerStyles,
} from "@/components";

export function FeedbackMessage(props: FeedbackMessageProps) {
  const heroHeaderProps: HeroHeaderProps = {
    title: props?.title,
    description: props?.description,
    ...(props?.icon && {
      icon: props.icon,
      iconSize: "small",
    }),
  };

  return (
    <Stack {...feedbackMessageContainerStyles}>
      <HeroHeader {...heroHeaderProps} />

      <LinkButton href={props.href} fullWidth>
        {props.buttonLabel}
      </LinkButton>
    </Stack>
  );
}
