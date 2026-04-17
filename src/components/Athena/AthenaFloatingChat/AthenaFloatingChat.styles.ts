import { SxProps, Theme } from "@mui/material";

export const athenaFabStyles: SxProps<Theme> = {
  position: "fixed",
  bottom: { xs: "16px", md: "24px" },
  right: { xs: "16px", md: "24px" },
  zIndex: 1300,
  boxShadow: 6,
};

export const athenaChatContainerStyles: SxProps<Theme> = {
  position: "fixed",
  bottom: { xs: "16px", md: "24px" },
  right: { xs: "16px", md: "24px" },
  width: { xs: "calc(100vw - 32px)", md: "380px" },
  maxWidth: "380px",
  height: { xs: "70vh", md: "560px" },
  maxHeight: "calc(100vh - 48px)",
  zIndex: 1300,
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  backgroundColor: "common.white",
  boxShadow: 12,
  overflow: "hidden",
  border: "1px solid",
  borderColor: "grey.200",
};

export const athenaChatHeaderStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 16px",
  backgroundColor: "primary.main",
  color: "common.white",
};

export const athenaChatBodyStyles: SxProps<Theme> = {
  flex: 1,
  overflowY: "auto",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  backgroundColor: "grey.50",
};

export const athenaChatFooterStyles: SxProps<Theme> = {
  display: "flex",
  gap: "8px",
  padding: "12px",
  borderTop: "1px solid",
  borderColor: "grey.200",
  backgroundColor: "common.white",
};

export const athenaBubbleStyles = (
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

export const athenaChipStyles: SxProps<Theme> = {
  cursor: "pointer",
  backgroundColor: "common.white",
  borderColor: "primary.light",
  "&:hover": { backgroundColor: "primary.100" },
};
