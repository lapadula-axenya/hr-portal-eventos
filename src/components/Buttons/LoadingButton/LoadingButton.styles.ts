import { StackProps } from "@mui/material";

export const loadingButtonSpinnerContainerStyles: StackProps = {
  sx: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  component: "span",
};

export const loadingButtonLabelStyles = (loading: boolean): StackProps => ({
  sx: {
    visibility: loading ? "hidden" : "visible",
  },
  component: "span",
});
