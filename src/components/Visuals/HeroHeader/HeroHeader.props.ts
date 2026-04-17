import { ComponentType, SVGProps } from "react";

export type HeroHeaderSize = "small" | "medium" | "large";

export type HeroHeaderProps = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconSize?: HeroHeaderSize;
  colorfulIcon?: boolean;
  title?: string;
  description?: string;
  textContainerSize?: HeroHeaderSize;
};
