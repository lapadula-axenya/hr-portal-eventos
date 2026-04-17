"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  Suspense,
  PropsWithChildren,
} from "react";
import { Alert, Typography, Stack, Slide, Box } from "@mui/material";
import { LoadingScreen } from "@/components";

export type SnackbarItem = {
  id: number;
  title?: string;
  text: string;
  type?: "error" | "info";
};

export type SnackbarData = Omit<SnackbarItem, "id">;

type SnackbarContextType = {
  openSnackbar: (data: SnackbarData) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export function useSnackbarContext() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarProvider",
    );
  }
  return context;
}

export function SnackbarProvider({ children }: PropsWithChildren) {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const openSnackbar = useCallback((snackbar: SnackbarData) => {
    const id = Date.now() + Math.random();
    const newSnackbar: SnackbarItem = { id, ...snackbar };
    setSnackbars((prev) => [...prev, newSnackbar]);

    setTimeout(() => {
      setSnackbars((prev) => prev.filter((s) => s.id !== id));
    }, 6000);
  }, []);

  const closeSnackbar = useCallback((id: number) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      <Suspense fallback={<LoadingScreen />}>{children}</Suspense>

      <Box
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: (theme) => theme.zIndex.tooltip + 10,
          display: "flex",
          width: 323,
          flexDirection: "column",
          gap: 1,
        }}
      >
        {snackbars.map((snackbar) => (
          <Slide key={snackbar.id} direction="up" in mountOnEnter unmountOnExit>
            <Alert
              key={snackbar.id}
              onClose={() => closeSnackbar(snackbar.id)}
              severity={snackbar?.type ?? "info"}
              sx={{ width: "100%" }}
            >
              <Stack spacing={0.1}>
                {snackbar?.title && (
                  <Typography variant="subtitle2" fontWeight="bold">
                    {snackbar.title}
                  </Typography>
                )}
                <Typography variant="body2">{snackbar.text}</Typography>
              </Stack>
            </Alert>
          </Slide>
        ))}
      </Box>
    </SnackbarContext.Provider>
  );
}
