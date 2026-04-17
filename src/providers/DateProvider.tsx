"use client";

import { PropsWithChildren } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjsTz } from "@/lib/adapterDayjsTz";
import "dayjs/locale/pt-br";

export function DateProvider({ children }: PropsWithChildren) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjsTz} adapterLocale="pt-br">
      {children}
    </LocalizationProvider>
  );
}
