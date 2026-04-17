import { ButtonProps, CardProps, StackProps } from "@mui/material";

export const authFormContainerStyles: StackProps = {
  width: "100%",
  maxWidth: 600,
};

export const authFormCardStyles: CardProps = {
  sx: {
    padding: 1.25,
    height: "max-content",
  },
};

export const authFormButtonStyles: ButtonProps = {
  type: "submit",
  sx: {
    marginTop: "2rem !important",
  },
};
