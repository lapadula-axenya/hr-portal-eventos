import { BoxProps, SxProps, TypographyProps } from "@mui/material";
import { LucideProps } from "lucide-react";
import { theme } from "@/theme";
import { scrollbarStyle } from "@/theme/styles/scrollbar";

export const sideModalContainerStyles: SxProps = {
  ".MuiDialog-container > .MuiPaper-root": {
    width: "400px",
    maxHeight: "100vh",
    height: "100%",
    borderRadius: 0,
    marginLeft: "auto",
    border: "none",
    borderLeft: "1px solid",
    borderColor: "grey.700",
    bgcolor: "grey.900",
    padding: 0,
  },
};

export const sideModalBorderStyles: BoxProps = {
  width: "100%",
  height: "1px",
  sx: {
    background: "linear-gradient(90deg, #5F9FFF 0%, #00EADC 100%)",
  },
};

export const sideModalHeaderStyles: BoxProps = {
  minHeight: "36px",
  marginLeft: "auto",
  padding: "4px",
};

export const sideModalHeaderCloseButtonIconStyles: LucideProps = {
  size: 18,
  color: theme.palette.grey[300],
};

export const sideModalScrollBox: BoxProps = {
  sx: {
    ...scrollbarStyle,
    padding: "0 26px 26px",
    height: "100%",
  },
};

export const sideModalHeaderMessageStyles: TypographyProps = {
  variant: "h6",
  align: "center",
  lineHeight: 1.5,
};

export const sideModalHeaderMessageIconBoxStyles: TypographyProps = {
  marginBottom: "1rem",
};

export const sideModalHeaderMessageIconStyles: LucideProps = {
  size: 32,
  color: theme.palette.warning.light,
};
