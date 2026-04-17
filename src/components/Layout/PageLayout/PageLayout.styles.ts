import { StackProps } from "@mui/material";

export const pageLayoutContainerStyles: StackProps = {
  direction: "row",
};

export const pageLayoutMainStyles = (
  isExpandedPinned: boolean,
): StackProps => ({
  width: `calc(100% - ${isExpandedPinned ? "250px" : "80px"})`,
  marginLeft: "auto",
  sx: {
    transition: "0.3s all",
  },
});
