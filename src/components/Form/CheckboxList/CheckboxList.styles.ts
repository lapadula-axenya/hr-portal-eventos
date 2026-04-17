import { alpha, SxProps } from "@mui/material";
import { OverflowBoxProps } from "@/components/Layout";
import { theme } from "@/theme";

export const checkboxListContainerStyles: SxProps = {
  bgcolor: "grey.900",
  padding: "16px 12px",
  borderRadius: "8px",
};

const checkboxListLabelDefaultStyles: SxProps = {
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  margin: 0,
  ".MuiTypography-root": {
    userSelect: "none",
  },
};

export const checkboxListLabelStyles = (isChecked: boolean): SxProps => ({
  ...checkboxListLabelDefaultStyles,
  padding: "4px 10px",
  borderRadius: "4px",
  "&:hover": {
    bgcolor: alpha(theme.palette.grey[800], 0.8),
  },
  color: isChecked ? "white" : "grey.200",
  bgcolor: isChecked ? "grey.800" : "grey.900",
  ".MuiTypography-root": {
    fontSize: "12px",
  },
});

export const checkboxListLabelAllStyles = (isChecked: boolean): SxProps => ({
  ...checkboxListLabelDefaultStyles,
  paddingRight: "10px",
  ".MuiTypography-root": {
    color: isChecked ? "primary.main" : "grey.100",
    fontWeight: isChecked ? 700 : 400,
    fontSize: "14px",
  },
});

export const checkboxListInputStyles: SxProps = {
  padding: 0,
  ".MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
  },
};

export const checkboxListOverflowBoxStyles: OverflowBoxProps = {
  maxHeight: "400px",
  spacing: "8px",
};
