import { Stack, Typography } from "@mui/material";
import {
  HeroHeaderProps,
  BlurCircle,
  heroHeaderContainerStyles,
  heroHeaderDescriptionStyles,
  heroHeaderIconStyles,
  heroHeaderTextContainerStyles,
  heroHeaderTitleStyles,
} from "@/components";

export function HeroHeader(props: HeroHeaderProps) {
  if (!props?.title && !props?.description) {
    return <></>;
  }

  const iconSize = props?.iconSize ?? "medium";
  const colorfulIcon = props?.colorfulIcon ?? true;

  const textContainerSize = props?.textContainerSize ?? "medium";

  return (
    <Stack {...heroHeaderContainerStyles}>
      {props?.icon && (
        <BlurCircle>
          <props.icon {...heroHeaderIconStyles(iconSize, colorfulIcon)} />
        </BlurCircle>
      )}

      <Stack
        {...heroHeaderTextContainerStyles(
          !!props?.title,
          !!props?.description,
          textContainerSize,
        )}
      >
        {props?.title && (
          <Typography {...heroHeaderTitleStyles}>{props.title}</Typography>
        )}

        {props?.description && (
          <Typography {...heroHeaderDescriptionStyles}>
            {props.description}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
