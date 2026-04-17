import { StackProps, TypographyProps } from "@mui/material";
import { LucideProps } from "lucide-react";
import { HeroHeaderSize } from "@/components";
import { theme } from "@/theme";

export const heroHeaderContainerStyles: StackProps = {
  alignItems: "center",
};

export const heroHeaderIconStyles = (
  iconSize: HeroHeaderSize,
  colorfulIcon: boolean,
): LucideProps => {
  const sizeOptions: Record<HeroHeaderSize, number> = {
    small: 45,
    medium: 88,
    large: 160,
  };

  const marginBottomOptions: Record<HeroHeaderSize, number> = {
    small: 16,
    medium: 30,
    large: 53,
  };

  return {
    ...(colorfulIcon && {
      color: theme.palette.primary.main,
    }),
    size: sizeOptions[iconSize],
    style: {
      marginBottom: marginBottomOptions[iconSize],
    },
  };
};

export const heroHeaderTextContainerStyles = (
  hasTitle: boolean,
  hasDescription: boolean,
  textContainerSize: HeroHeaderSize,
): StackProps => {
  let marginBottom = 0;

  if (hasTitle) marginBottom = 2.75;
  if (hasDescription) marginBottom = 1.5;

  const widthOptions: Record<HeroHeaderSize, string> = {
    small: "330",
    medium: "430px",
    large: "100%",
  };

  return {
    spacing: 1,
    marginBottom,
    width: widthOptions[textContainerSize],
  };
};

export const heroHeaderTitleStyles: TypographyProps = {
  variant: "h4",
  fontWeight: 700,
  textAlign: "center",
};

export const heroHeaderDescriptionStyles: TypographyProps = {
  color: "grey.100",
  textAlign: "center",
};
