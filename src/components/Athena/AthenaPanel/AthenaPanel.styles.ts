import { SxProps, Theme } from "@mui/material";

export const athenaCardStyles: SxProps<Theme> = {
  borderRadius: "12px",
  border: "1px solid",
  borderColor: "primary.light",
  backgroundColor: "primary.50",
  padding: "16px",
};

export const athenaHeaderStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
};

export const athenaChipStyles: SxProps<Theme> = {
  cursor: "pointer",
  backgroundColor: "common.white",
  borderColor: "primary.light",
  "&:hover": { backgroundColor: "primary.100" },
};

export const athenaChatBubbleStyles = (
  role: "user" | "assistant",
): SxProps<Theme> => ({
  alignSelf: role === "user" ? "flex-end" : "flex-start",
  backgroundColor: role === "user" ? "primary.main" : "common.white",
  color: role === "user" ? "common.white" : "grey.100",
  padding: "10px 14px",
  borderRadius: "12px",
  maxWidth: "85%",
  border: "1px solid",
  borderColor: role === "user" ? "primary.main" : "grey.200",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const athenaInputRowStyles: SxProps<Theme> = {
  display: "flex",
  gap: "8px",
  marginTop: "12px",
};
