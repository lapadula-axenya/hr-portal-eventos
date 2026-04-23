import {
  StackProps,
  TableContainerProps,
  TableProps,
  TypographyProps,
} from "@mui/material";

export const pageTableStyles: StackProps = {
  spacing: "1rem",
  height: "100%",
  minWidth: 0,
};

export const pageTableContainerStyles: TableContainerProps = {
  sx: {
    flexGrow: 1,
    minWidth: 0,
    maxWidth: "100%",
  },
};

export const pageTableSearchResultMessageStyles: TypographyProps = {
  color: "grey.100",
  fontWeight: 700,
  marginBottom: 1.5,
};

export const tableStyles: TableProps = {
  sx: {
    borderSpacing: "0 5px",
  },
};
