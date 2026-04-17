import { PaletteOptions } from "@mui/material";

const grey = {
  "900": "#090A0A",
  "800": "#131314",
  "700": "#252427",
  "500": "#3b3b3b",
  "300": "#7E7E7E",
  "100": "#A6A7A9",
};

export const palette = {
  primary: {
    light: "#50EDCF",
    main: "#25E9C4",
    dark: "#141E1D",
  },

  secondary: {
    main: grey[500],
  },

  grey,

  background: {
    default: grey[900],
    paper: grey[800],
  },

  divider: grey[700],

  error: {
    light: "#F6685E",
    main: "#F44336",
    dark: "#562F2F",
  },

  warning: {
    main: "#FFB420",
  },

  success: {
    main: "#44A047",
  },

  white: "#FFFFFF",
};

export const paletteOptions: PaletteOptions = palette;
