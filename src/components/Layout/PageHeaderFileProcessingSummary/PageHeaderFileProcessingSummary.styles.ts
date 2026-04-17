import {
  StackProps,
  SxProps,
  TableBodyProps,
  TableHeadProps,
  TypographyProps,
} from "@mui/material";

export const pageHeaderFileProcessingSummaryContainerStyles: StackProps = {
  spacing: 1,
};

export const pageHeaderFileProcessingSummaryTextStyles: TypographyProps = {
  sx: { wordBreak: "break-word" },
  variant: "body2",
};

export const pageHeaderFileProcessingSummarySuccessRowsLabelStyles: TypographyProps =
  {
    variant: "body2",
    color: "success.main",
    fontWeight: 700,
  };

export const pageHeaderFileProcessingSummaryFailedRowsLabelStyles: TypographyProps =
  {
    variant: "body2",
    color: "error.main",
    fontWeight: 700,
  };

export const pageHeaderFileProcessingSummaryTableContainerStyles: SxProps = {
  maxHeight: 300,
  overflow: "auto",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1,
};

export const pageHeaderFileProcessingSummaryTableHeadStyles: TableHeadProps = {
  sx: {
    ".MuiTableCell-root": {
      bgcolor: "grey.700",
      fontSize: 14,
      fontWeight: 700,
      padding: "6px 16px",
      textAlign: "center",
    },
  },
};

export const pageHeaderFileProcessingSummaryTableBodyStyles: TableBodyProps = {
  sx: {
    ".MuiTableCell-root": {
      bgcolor: "grey.900",
      fontSize: 12,
      lineHeight: 1,
      padding: "8px 16px",
      textAlign: "center",
      color: "grey.300",
    },
  },
};
