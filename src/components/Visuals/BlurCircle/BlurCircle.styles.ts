import { alpha, StackProps } from "@mui/material";
import { theme } from "@/theme";

export const blurCircleStyles: StackProps = {
  position: "relative",
  sx: {
    "&:before": {
      content: "''",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      bgcolor: alpha(theme.palette.primary.main, 0.3),
      zIndex: -1,
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      aspectRatio: "1 / 1",
      filter: "blur(80px)",
    },
  },
};
