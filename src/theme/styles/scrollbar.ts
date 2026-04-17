import { palette } from "../palette";

export const scrollbarStyle = {
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: palette.grey?.[500],
    borderRadius: "4px",
    width: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: palette.grey?.[300],
    borderRadius: "4px",
    width: "3px",
  },
};
