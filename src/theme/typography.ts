import type { TypographyVariantsOptions } from "@mui/material/styles";
import { HTML_FONT_SIZE } from "@/utils/pxToRem";

const LINE_HEIGHT_125 = "125%";
const LINE_HEIGHT_135 = "135%";
const LINE_HEIGHT_140 = "140%";
const LINE_HEIGHT_160 = "160%";

export const typography: TypographyVariantsOptions = {
  htmlFontSize: HTML_FONT_SIZE,
  h1: {
    fontSize: 61,
    lineHeight: LINE_HEIGHT_125,
  },
  h2: {
    fontSize: 48,
    lineHeight: LINE_HEIGHT_125,
  },
  h3: {
    fontSize: 39,
    lineHeight: LINE_HEIGHT_125,
  },
  h4: {
    fontSize: 31,
    lineHeight: LINE_HEIGHT_125,
  },
  h5: {
    fontSize: 25,
    lineHeight: LINE_HEIGHT_125,
  },
  h6: {
    fontSize: 20,
    lineHeight: LINE_HEIGHT_125,
  },
  subtitle1: {
    fontSize: 18,
    lineHeight: LINE_HEIGHT_125,
  },
  subtitle2: {
    fontSize: 14,
    lineHeight: LINE_HEIGHT_125,
  },
  body1: {
    fontSize: 16,
    lineHeight: LINE_HEIGHT_160,
  },
  body2: {
    fontSize: 14,
    lineHeight: LINE_HEIGHT_160,
  },
  button: {
    fontSize: 14,
    lineHeight: LINE_HEIGHT_140,
    textTransform: "initial",
  },
  caption: {
    fontSize: 12,
    lineHeight: LINE_HEIGHT_135,
  },
  overline: {
    fontSize: 10,
    lineHeight: LINE_HEIGHT_135,
  },
};
