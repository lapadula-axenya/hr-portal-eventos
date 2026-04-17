import { StackProps, TypographyProps } from "@mui/material";

export const authHeaderContainerStyles: StackProps = {
  spacing: 7.625,
  maxWidth: 390,
  position: "sticky",
  top: 48,
  height: "calc(100vh - 6rem)",
  alignSelf: "start",
  justifyContent: "center",
};

export const authHeaderTextContainerStyles: StackProps = {
  spacing: 3.375,
};

export const authHeaderTitleStyles: TypographyProps = {
  variant: "h3",
  fontWeight: 500,
};

export const authHeaderDescriptionStyles: TypographyProps = {
  variant: "subtitle1",
};
