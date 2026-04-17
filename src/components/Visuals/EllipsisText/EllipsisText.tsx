import { Typography } from "@mui/material";
import { EllipsisTextProps } from "@/components";

export function EllipsisText({ lineClamp = 1, ...props }: EllipsisTextProps) {
  return (
    <Typography
      {...props}
      sx={{
        display: "-webkit-box",
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...props?.sx,
      }}
    >
      {props.children}
    </Typography>
  );
}
